import React, { Component } from 'react';
import { Card, InputBase, Avatar, Tooltip, CardContent } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getAllNotes, editNote, archiveNotes, colorNotes, reminderNotes } from '../services/noteServices';
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import MoreMenu from '../components/moreComponent';
import ColorComponent from '../components/colorComponent';
import Collaborators from '../components/collaboratorComponents';

function titleDescriptionSearch(searchText) {
    return function (val) {
        return val.title.includes(searchText) || val.description.includes(searchText) 
    }
}
class GetNotes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            open: false,
            noteId: '',
            title: '',
            description: '',
            color: '',
            isArchived: false,
            reminder: '',
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
    handleEditNote = (title, description, noteId, color) => {
        this.setState({
            noteId: noteId,
            open: false,
            title: title,
            description: description,
            color: color,
        })
        let data = {
            noteId: this.state.noteId,
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
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
    handleChangeColor = (color, noteId) => {
        let data = {
            color: color,
            noteIdList: [noteId]
        }
        console.log("res in colorData", data);
        colorNotes(data).then(res => {
            console.log("res in colorNotes", res);
        })
            .catch(err => {
                console.log("err in colorNote component ", err);
            });
    }
    handleReminder = (reminder, noteId) => {
        let data = {
            reminder: reminder,
            noteIdList: [noteId]
        }
        console.log("res in reminderData", data);
        reminderNotes(data).then(res => {
            console.log("res in reminderNotes", res);
        })
            .catch(err => {
                console.log("err in reminderComponent", err);
            });
    }
    handleCreateLabel = (isTrue) => {
        if (isTrue) {
            this.handleGetNotes()
        }
    }
    render() {
        return (
            <div>
                {!this.state.open ? (
                    <div className="allNotes">
                        <div className="notesAll_">
                            {
                                this.state.notes.filter(titleDescriptionSearch(this.props.searchText)).map(key => {
                                    return (
                                        key.isArchived === false && key.isDeleted === false &&
                                        <div className="getCardNote">
                                            <Card className="getcard" style={{ borderRadius: '10px', backgroundColor: key.color, width: '20em' }}>
                                                <div onClick={this.handleOpenDialogue}>
                                                    <InputBase
                                                        value={key.title}
                                                        multiline
                                                        onClick={() => this.handleEditNote(key.title, key.description, key.color, key.id)} />
                                                </div>
                                                <div onClick={this.handleOpenDialogue}>
                                                    <InputBase
                                                        value={key.description}
                                                        multiline
                                                        onClick={() => this.handleEditNote(key.title, key.description, key.color, key.id)} />
                                                </div>
                                                <div onClick={this.handleOpenDialogue}>
                                                    <InputBase
                                                        value={key.reminder}
                                                        multiline
                                                        onClick={() => this.handleEditNote(key.title, key.description, key.color, key.id)} />
                                                </div>
                                                <div className="collaborator-avtar-email">
                                                    {key.collaborators.map(data => {
                                                        //console.log("col in collaborators", data);
                                                        return (
                                                            <Tooltip title={data.email}>
                                                                <div className="collaborator-avatar" style={{ cursor: 'pointer' }}>
                                                                    <Avatar style={{ width: "35px", height: "35px" }} />
                                                                </div>
                                                            </Tooltip>
                                                        )
                                                    })}
                                                </div>

                                                <div className="imageIconCard">
                                                    <div style={{ cursor: 'pointer' }}><AddAlertIcon onClick={() => this.handleReminder(key.reminder, key.id)} />
                                                    </div>
                                                    <div><Collaborators noteId={key.id} /></div>
                                                    <div><ColorComponent
                                                        colorPatter={this.handleChangeColor}
                                                        noteId={key.id} /></div>
                                                    <div><ImageIcon /></div>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => this.handleArchiveNotes(key.id)} notecolor={key.color}><ArchiveIcon /></div>
                                                    <div><MoreMenu
                                                        noteId={key.id}
                                                        title={key.title}
                                                        description={key.description}
                                                        createLabelPropsTogetNote={this.handleCreateLabel} />
                                                    </div>
                                                </div>
                                                <CardContent>{
                                                    <div className="showQuestion">
                                                        {(key.questionAndAnswerNotes.length > 0) &&
                                                            <div className="ques-asked" style={{ borderTop: "1px solid", padding: "5px" }}>
                                                                <b className="quesHeanding">
                                                                    Question Asked
                                                            </b>
                                                                <div className="questionGetDispaly"
                                                                    dangerouslySetInnerHTML={{ __html: key.questionAndAnswerNotes[key.questionAndAnswerNotes.length - 1].message.toString() }}>
                                                                </div>
                                                            </div>}
                                                    </div>
                                                }
                                                </CardContent>
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
                    </div>)
                }
            </div>
        );
    }
}
export default withRouter(GetNotes)
