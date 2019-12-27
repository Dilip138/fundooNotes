import React, { Component } from 'react';
import { Card, InputBase } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getAllNotes, editNote, archiveNotes } from '../sercvice/userService';
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import MoreMenu from '../component/moreComponent';

class GetNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            open: false,
            noteId: '',
            title: '',
            description: '',
            isArchived: false
        };
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
    handleOpenDialogue = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleEditNote = (title, description, noteId) => {
        this.setState({
            noteId: noteId,
            open: false,
            title: title,
            description: description
        })
        let data = {
            noteId: this.state.noteId,
            title: this.state.title,
            description: this.state.description
        }
        //console.log("res in editData",data)
        editNote(data).then(res => {
            console.log("res in editNote", res);
            this.handleGetNotes()
        })
            .catch(err => {
                console.log("err in editNote component ", err);
            });
    }
    handleTitle = (event) => {
        let title = event.target.value
        this.setState({
            title: title
        })
    }
    handleDescription = (event) => {
        let description = event.target.value
        this.setState({
            description: description
        })
    }
    handleArchiveNotes = (noteId) => {
        let data = {
            isArchived: true,
            noteIdList: [noteId]
        }
        console.log("res in noteData", noteId);

        archiveNotes(data).then(res => {
            console.log("res in archiveNotes", res)
        })
            .catch(err => {
                console.log("err in archiveNote component ", err);
            });
    }
    render() {
        return (
            <div>
                {!this.state.open ? (
                    <div className="allNotes">
                        <div className="notesAll_">
                            {
                                this.state.notes.map(key => {
                                    return (
                                        key.isArchived === false && key.isDeleted === false &&
                                        <div className="getCardNote">
                                            <Card className="getcard" style={{ boxShadow: "0px 0px 7px 0px", border: "1px solid black", borderRadius: '10px' }}>
                                                <div onClick={this.handleOpenDialogue}>
                                                    <InputBase
                                                        value={key.title}
                                                        multiline
                                                        onClick={() => this.handleEditNote(key.title, key.description, key.id)} />
                                                </div>
                                                <div onClick={this.handleOpenDialogue}>
                                                    <InputBase
                                                        value={key.description}
                                                        multiline
                                                        onClick={() => this.handleEditNote(key.title, key.description, key.id)} />
                                                </div>
                                                <div className="imageIconCard">
                                                    <div><AddAlertIcon /></div>
                                                    <div><PersonAddIcon /></div>
                                                    <div><ColorLensIcon /></div>
                                                    <div><ImageIcon /></div>
                                                    <div onClick={() => this.handleArchiveNotes(key.id)}><ArchiveIcon /></div>
                                                    <div><MoreMenu
                                                        noteId={key.id} />
                                                    </div>

                                                </div>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ) :
                    (<div>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleOpenDialogue}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <Card className="dialogCard">
                                <div>
                                    <b><InputBase
                                        //placeholder="Title"
                                        value={this.state.title}
                                        onChange={this.handleTitle} /></b>
                                </div>
                                <div className="inputNote">
                                    <InputBase
                                        // placeholder="Take a note..."
                                        value={this.state.description}
                                        onChange={this.handleDescription} />
                                </div>
                                <div className="imageAndClose">
                                    <div className="imageIcon">
                                        <div><AddAlertIcon /></div>
                                        <div><PersonAddIcon /></div>
                                        <div><ColorLensIcon /></div>
                                        <div><ImageIcon /></div>
                                        <div><ArchiveIcon /></div>
                                        <div><MoreVertIcon /></div>
                                    </div>
                                    <div onClick={this.handleEditNote} style={{ cursor: 'pointer' }}>Close</div>
                                </div>
                            </Card>
                        </Dialog>
                    </div>)}
            </div>
        );
    }
}
export default withRouter(GetNotes)