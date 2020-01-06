import React, { Component } from 'react';
import { Card, Dialog, Divider, Avatar, Button, InputBase, DialogTitle, DialogContent } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default class Collaborators extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
        }
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
    render() {
        return (
            <div>
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
                                    <div className="collaborator-avtar-email">
                                        <div className="collaborator-avatar">
                                            <Avatar style={{ width: "35px", height: "35px" }} />
                                        </div>
                                        <div>
                                            <InputBase
                                                placeholder="Person or email share with" />
                                        </div>
                                    </div>
                                    <div className="collaborator-button">
                                        <div>
                                            <Button >cancel</Button>
                                        </div>
                                        <div>
                                            <Button>save</Button>
                                        </div>
                                    </div>
                                </div >
                            </DialogContent>
                        </Card>
                    </ClickAwayListener>

                </Dialog>
            </div>
        );
    }
}
