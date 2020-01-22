import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getAllNotes, trashNotes } from '../services/noteServices';
import CreateLabelComponent from '../components/createLabelComponent';
import { withRouter } from 'react-router-dom';

class MoreMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: false,
      notes: [],
      open: false,
      isDeleted: false,
    }
  }
  handleQuestion = () => {
    let data = {
      notesId: this.props.noteId,
      title: this.props.title,
      description: this.props.description,
    }
    this.props.history.push('/askQuestion', data)
  }
  handleShowQuestion = () => {
    let data = {
      notesId: this.props.noteId,
      title: this.props.title,
      description: this.props.description,
      questionAndAnswerNotes: this.props.questionAndAnswerNotes,

    }
    // console.log("res in data for showanswer", data);
    this.props.history.push("/askQuestion", data)
  }
  handleMenu = (e) => {
    this.setState({
      anchorEl: this.state.anchorEl ? false : e.target,
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: false
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
      this.handleGetNotes()
    })    
      .catch(err => {
        console.log("err in trshNote component ", err);
      });
  }
  handleCreate = (isTrue) => {
    this.props.createLabelPropsTogetNote(isTrue)
  }
  render() {
    // console.log("question Answer",this.props.questionAndAnswerNotes.length);    
    return (
      <div className="moreComponent">
        <div style={{ cursor: 'pointer' }} onClick={(e) => this.handleMenu(e)}>
          <MoreVertIcon />
        </div>
        <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
          <Paper>
            <MenuList>
              <MenuItem onClick={() => this.handleTrash(this.props.noteId)}>Delete note</MenuItem>
              <MenuItem><CreateLabelComponent noteIdLabel={this.props.noteId} createLabelPropsTogetNote={this.handleCreate} /></MenuItem>
              {this.props.questionAndAnswerNotes !== undefined ?
                this.props.questionAndAnswerNotes.length > 0 ?
                  <MenuItem onClick={this.handleShowQuestion}>Show question</MenuItem>
                  :
                  <MenuItem onClick={this.handleQuestion} notesId={this.props.noteId} >Ask a question</MenuItem>
                : (null)
              }
              <MenuItem onClick={this.handleClose}>Make a copy</MenuItem>
            </MenuList>
          </Paper>
        </Popper>

      </div >
    );
  }
}
export default withRouter(MoreMenu)
