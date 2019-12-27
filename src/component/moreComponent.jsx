import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getAllNotes,trashNotes } from '../sercvice/userService';

export default class MoreMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      anchorEl: null,
      notes: [],
      isDeleted: false,
    }
  }
  handleMenu = (e) => {
    this.setState({
      anchorEl: this.state.anchorEl ? false : e.target,
      open: !this.state.open
    });
  };
  handleClose = () => {
    this.setState({
      open: this.state.open
    });
  };
  componentDidMount() {
    this.handleGetNotes()
  }
  handleGetNotes = () => {
    getAllNotes().then(res => {
      this.setState({
        notes: res.data.data.data
      })
      console.log("res in notesData", this.state.notes);
    }).catch(err => {
      console.log("err", err);
    })
  }
  handleTrash = (noteId) => {
    let data = {
      isDeleted: true,
      noteIdList: [noteId]
    }
    console.log("res in handleData", data);
    trashNotes(data).then(res => {
      console.log("res in trashNotes", res)
    })
      .catch(err => {
        console.log("err in trshNote component ", err);
      });
  }
  render() {
    return (
      <div>
        <div onClick={(e) => this.handleMenu(e)}>
          <MoreVertIcon />
        </div>
        <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
          <Paper>
            <ClickAwayListener onClickAway={this.handleClose}>
              <MenuList>
                <MenuItem onClick={()=>this.handleTrash(this.props.noteId)}>Delete note</MenuItem>
                <MenuItem onClick={this.handleClose}>Add label</MenuItem>
                <MenuItem onClick={this.handleClose}>Add drawing</MenuItem>
                <MenuItem onClick={this.handleClose}>Make a copy</MenuItem>
                <MenuItem onClick={this.handleClose}>Show checkboxes</MenuItem>
                <MenuItem onClick={this.handleClose}>Copy to Google Docs</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </div>
    );
  }
}
