import React, { Component } from 'react';
import { Card, Dialog, Divider, Avatar, Button, InputBase, DialogTitle, DialogContent, List, ListItem } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { addCollaborators } from '../services/noteServices';
import { searchUserList, getuserList } from '../services/userService';

const firstName = localStorage.getItem('firstName')
const lastName = localStorage.getItem('lastName')

export default class Collaborators extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            collaborator: [],
            searchText: '',
            trueSign: false,
            allUserEmail: [],
            listUser: [],
            // collaborators:this.props.collaboratorToGetNote
        }
    }
    componentDidMount() {
        getuserList().then(res => {
            console.log("res in userList", res);
            let userList = res.data.map(key => {
                return key.email
            })
            this.setState({
                allUserEmail: userList
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
    handleOnChangeUser = (event) => {
        let searchCharacter = event.target.value
        let listUser = [];
        if (searchCharacter.length > 0) {
            let regex = new RegExp(`^${searchCharacter}`, 'i');
            listUser = this.state.allUserEmail.sort().filter(v => regex.test(v))
        }
        this.setState({
            listUser: listUser,
            searchText: searchCharacter
        })
    }
    selectCollaborator = (value) => {
        this.setState({
            searchText: value,
            listUser: [],
        })
        let data = {
            "searchWord": value
        }
        searchUserList(data).then(res => {
            this.setState({
                collaborator: res.data.data.details
            })
        })
    }
    handleSave = () => {
        let collaboratorData = this.state.collaborator.map(key => {
            return key
        })
        addCollaborators(collaboratorData[0], this.props.noteId).then(res => {
            console.log("res in collaborator", res)
            this.setState({
                open: false
            })
        })
    }
    render() {
        //console.log("ghrthrghrfyrthyryhtrrthr----------------",this.props.collaboratorToGetNote);
        
        let listUserData = this.state.listUser.map(key => {
            return (
                <List>
                    <ListItem
                        onClick={()=>this.selectCollaborator(key)}>
                        {key}
                    </ListItem>
                </List>
            )
        })
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
                                {/* {this. state.collaborators.map(key => {
                                    return (
                                        <div className="collaborator-avtar-email">
                                            <div className="collaborator-avatar">
                                                <Avatar style={{ width: "35px", height: "35px" }}>
                                                    <img alt="pic"
                                                        src={localStorage.getItem('imageUrl')}
                                                    />
                                                </Avatar>
                                            </div>
                                            <div>
                                                <div>
                                                    <span>{key.email}</span>
                                                </div>
                                                <div>
                                                    <ClearIcon />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })} */}
                                <div className="collaborator-avtar-email">
                                    <div className="collaborator-avatar">
                                        <Avatar style={{ width: "35px", height: "35px" }} />
                                    </div>
                                    <div className="collaborator-personOremail">
                                        <div className="collaborator_input">
                                            <InputBase
                                                value={this.state.searchText}
                                                onKeyDown={this.handleSign}
                                                placeholder="Person or email share with"
                                                onChange={this.handleOnChangeUser} />
                                        </div>
                                        <div>
                                            {this.state.trueSign ? <DoneIcon /> : (null)}
                                        </div>
                                    </div>
                                </div>
                                <div className="collaborator-avtar-email">
                                    <List>
                                        {listUserData}
                                    </List>
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
