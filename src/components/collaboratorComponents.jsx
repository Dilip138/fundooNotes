import React, { Component } from 'react';
import { Card, Dialog, Divider, Avatar, Button, InputBase, DialogTitle, DialogContent, Tooltip, MenuItem } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { getAllNotes, addCollaborators, removeCollaborator } from '../services/noteServices';
import { searchUserList, getuserList } from '../services/userService';

const firstName = localStorage.getItem('firstName')
const lastName = localStorage.getItem('lastName')

export default class Collaborators extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            searchText: '',
            trueSign: false,
            allUserEmail: [],
            notes: [],
            filteredEmails: [],
            searchData: [],
            card: false,
        }
    }
    componentDidMount() {
        getuserList().then(res => {
            //console.log("res in userList", res);
            let userList = res.data.map(key => {
                return key.email
            })
            this.setState({
                allUserEmail: userList
            })
            // console.log("res in allUserList", this.state.allUserEmail)
        })
    }
    handleSearch = () => {
        const filteredEmail = this.state.allUserEmail.filter(key => {
            return key.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
        })
        this.setState({
            card: true,
            filteredEmails: filteredEmail,
        })
    }
    handleClear = (userId) => {
        let data = {
            noteId: this.props.noteId,
            collaboratorUserId: userId
        }
        removeCollaborator(data).then(res => {
            console.log("res in removeCollaborator", res)
            this.getNotes()
        })
    }
    getNotes = () => {
        getAllNotes().then(res => {
            this.setState({
                notes: res.data.data.data
            })
        })
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
    handleCollaborator = (e) => {
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
    handleOnChangeUser = (event) => {
        const searchText = event.target.value
        this.setState({
            searchText: searchText
        })
    }
    handleMenu = (event) => {
        this.setState({
            card: false,
            searchText: event.target.value,
        })
    }
    handleSave = () => {
        let data = {
            "searchWord": this.state.searchText
        }
        searchUserList(data).then((res) => {
            console.log("res in search user list is", res);
            this.setState({
                searchData: res.data.data.details,
            })
            console.log("res.data in collab ", res.data.data.details[0].email);
            let searChUserData = {
                "email": res.data.data.details[0].email,
                "firstName": res.data.data.details[0].firstName,
                "lastName": res.data.data.details[0].lastName,
                "userId": res.data.data.details[0].userId
            }
            console.log("this.props.noteId", searChUserData);
            addCollaborators(searChUserData, this.props.noteId).then((res) => {
                console.log("res after hitting adding collaborator api is ", res);
                this.setState({
                    searchText: ''
                })
                this.getNotes()
            }).catch((err) => {
                console.log("err in collaborator api", err);
            })
            console.log("searChUserData---------->", searChUserData);

        }).catch(err => {
            console.log("err in search user api ", err);
        })
    }
    render() {
        return (
            <div className="main_collaborator">
                <div>
                    <PersonAddIcon onClick={(e) => this.handleCollaborator(e)} cursor="pointer" />
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
                                            <b>{firstName}</b>
                                            <b>{lastName}</b>
                                            <span style={{ fontFamily: "Roboto arial sansSerif", paddingLeft: "10px" }}> (owner)</span>
                                        </span>
                                        <br />
                                        {localStorage.getItem('email')}
                                    </div>
                                </div>
                                {this.state.notes.map(key => {
                                    return (
                                        key.id === this.props.noteId ?
                                            <div className="collaboratorEmailAll">
                                                {key.collaborators.map(collab => {
                                                    return (
                                                        <div className="collaborator-avtar-email">
                                                            <div className="collaborator-avatar">
                                                                <Tooltip title={collab.email} >
                                                                    <Avatar style={{ width: "35px", height: "35px" }} />
                                                                </Tooltip>
                                                            </div>
                                                            <div className="collaborator-personOremail">
                                                                <div className="collaborator_input">
                                                                    <b>{collab.email}</b>
                                                                </div>
                                                                <div style={{ cursor: 'pointer' }}>
                                                                    <ClearIcon onClick={() => this.handleClear(collab.userId)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            : (null))
                                })

                                }
                                <div className="collaborator-avtar-email">
                                    <div className="collaborator-avatar">
                                        <Avatar style={{ width: "35px", height: "35px" }} />
                                    </div>
                                    <div className="collaborator-personOremail">
                                        <div className="collaborator_input">
                                            <InputBase
                                                value={this.state.searchText}
                                                onKeyDown={this.handleSign}
                                                onKeyUp={this.handleSearch}
                                                placeholder="Person or email share with"
                                                onChange={this.handleOnChangeUser} />
                                        </div>
                                        <div>
                                            {this.state.trueSign ? <DoneIcon /> : (null)}
                                        </div>
                                    </div>
                                </div>
                                <div className="allEmail-show">
                                    {
                                        this.state.card !== false && this.state.searchText !== '' ?
                                            <Card>
                                                {
                                                    this.state.filteredEmails.map(key => {
                                                        return (
                                                            <div class="allEmail">
                                                                <MenuItem onClick={this.handleMenu}>
                                                                    {key}
                                                                </MenuItem>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Card> : (null)
                                    }
                                </div>
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
