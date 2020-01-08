import React, { Component } from 'react';
import { Popper, Paper, ClickAwayListener, Tooltip, InputBase, Button, Checkbox, List, } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { addNoteLabels } from '../services/noteServices'

export default class CraeteLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorElLabel: false,
            open: false,
            label: '',
            labelData: [],
            isDeleted: false,
            clear:false
        }
    }
    handleMoreVertical = (e) => {
        this.setState({
            anchorElLabel: this.state.anchorElLabel ? false : e.target,
        });
        // this.props.craeteLabelToMore(true)
    }
    handleListenerClose = () => {
        this.setState({
            anchorElLabel: false
        })
    }
    openLabel = () => {
        this.setState({
            open: true
        })
    }
    handleChangeLabel = (event) => {
        this.setState({
            label: event.target.value
        })
    }
    handleCreateLabel = () => {
        let data = {
            isDeleted: false,
            label: this.state.label,
            userId: localStorage.getItem('userId')
        }
        addNoteLabels(data, this.props.noteIdLabel).then(res => {
            console.log("res in labeldata", res)
            this.setState({
                createLabel: res.data.label
            })
        })
    }
    render() {
        let data = this.state.labelData.map(key => {
            return (
                <div>
                    <List>
                        <Checkbox
                            value={key.label}
                            onClick={this.checkNotes(key.id)}>
                        </Checkbox>
                        {key.label}
                    </List>
                </div>
            )
        })
        return (
            <div>
                <div style={{ cursor: 'pointer' }}>
                    <Tooltip title="Archive">
                        <MoreVertIcon onClick={(e) => this.handleMoreVertical(e)} />
                    </Tooltip>
                </div>
                {!this.state.open ?
                    (<Popper open={this.state.anchorElLabel} anchorEl={this.state.anchorElLabel} style={{ zIndex: "999" }} >
                        <Paper>
                            <ClickAwayListener onClickAway={this.handleListenerClose}>
                                <MenuList>
                                    <div onClick={this.openLabel}>
                                        <MenuItem >Add label</MenuItem>
                                    </div>
                                    <MenuItem >Add drawing</MenuItem>
                                    <MenuItem >Show checkboxes</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>) :

                    (<Popper open={this.state.anchorElLabel} anchorEl={this.state.anchorElLabel} style={{ zIndex: "999" }} >
                        <Paper>
                            <ClickAwayListener onClickAway={this.handleListenerClose}>
                                <div className="dialogLabel">
                                    <div>
                                        <p>Label note</p>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <InputBase
                                                placeholder="Enter label name"
                                                value={this.state.label}
                                                onChange={this.handleChangeLabel} />
                                        </div>
                                        <div>
                                            <SearchIcon style={{ color: "black" }} />
                                        </div>
                                        <div> {data}</div>

                                        <div>
                                            {this.state.clear ?
                                                (<button onClick={this.handleCreateLabel}><span>+ create {this.state.label}</span></button>) : (null)}
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>)}
            </div>
        );
    }
}
