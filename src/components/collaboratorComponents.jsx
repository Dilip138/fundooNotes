import React, { Component } from 'react';
import { Card, Dialog, Divider, Avatar, Button, InputBase, DialogTitle, DialogContent } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DoneIcon from '@material-ui/icons/Done';
import { addCollaborators } from '../services/noteServices';
import { searchUserList } from '../services/userService';

export default class Collaborators extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            searchData: '',
            collaboratorData: [],
            email: '',
            trueSign: false,
        }
    }
    handleSign = () => {
        this.setState({
            trueSign: true
        })
    }
    handleOpenDialogue = () => {
        this.setState({
            open: true
        })
    }
    handleColloborator = (e) => {
        this.setState({
            open: this.state.open ? false : e.target,
        })
    }
    handleListenerClose = () => {
        this.setState({
            open: false
        })
    }
    handleCancel = () => {
        this.setState({
            open: false
        })
    }
    handleSearchUserEmail = (value) => {
        this.setState({
            searchUserEmail: value
        })
    }
    handleSave = () => {
        let searchUserData = {
            searchUserEmail: this.state.searchUserEmail
        }
        searchUserList(searchUserData).then(res => {
            this.setState({
                searchData: res.data.data.details
            })
            console.log("res in searchEmail", res)
            let data = {
                email: res.data.data.details[0].email
            }
            addCollaborators(data, this.props.noteId).then(res => {
                console.log("res in collaborator", res)
                this.setState({

                    open: false
                })
            })
        })
    }
    render() {
        return (
            <div className="main_collaborator">
                <div>
                    <PersonAddIcon onClick={(e) => this.handleColloborator(e)} cursor="pointer" />
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleOpenDialogue}>
                    <ClickAwayListener onClickAway={this.handleListenerClose}>
                        <Card className="dialogCard">
                            <DialogTitle>
                                Collaborators
                                </DialogTitle>
                            <Divider />
                            <DialogContent>
                                <div>
                                    <div className="collaborator-avtar-email">
                                        <div className="collaborator-avatar">
                                            <Avatar style={{ width: "35px", height: "35px" }}>
                                                <img alt="pic"
                                                    src={localStorage.getItem('imageUrl')}
                                                />
                                            </Avatar>
                                        </div>
                                        <div className="collaborator-email">
                                            <span style={{ fontFamily: 'Roboto' }}>
                                                <b>{localStorage.getItem('firstName')}
                                                    {localStorage.getItem('lastName')}
                                                </b>
                                                <span style={{ fontFamily: "Roboto arial sansSerif", paddingLeft: "10px" }}>
                                                    (owner)</span>
                                            </span>
                                            <br />
                                            {localStorage.getItem('email')}
                                        </div>
                                    </div>
                                    {this.state.collaboratorData.map(key => {
                                        return (
                                            <div className="collaborator-avtar-email">
                                                <div className="collaborator-avatar">
                                                    <Avatar style={{ width: "35px", height: "35px" }}>
                                                        <img alt="pic"
                                                            src={key.collaborators}
                                                        />
                                                    </Avatar>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                    <div className="collaborator-avtar-email">
                                        <div className="collaborator-avatar">
                                            <Avatar style={{ width: "35px", height: "35px" }} />
                                        </div>
                                        <div className="collaborator-personOremail">
                                            <InputBase
                                                onKeyDown={this.handleSign}
                                                placeholder="Person or email share with"
                                                onChange={this.handleSearchUserEmail} />
                                            <div>
                                                {this.state.trueSign ? <DoneIcon /> : (null)}
                                            </div>
                                        </div>
                                    </div>
                                </div >
                                <div className="collaborator-button">
                                    <div>
                                        <Button onClick={this.handleCancel} >cancel</Button>
                                    </div>
                                    <div>
                                        <Button onClick={this.handleSave}>save</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Card>
                    </ClickAwayListener>
                </Dialog>
            </div>
        );
    }
}
