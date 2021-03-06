import React, { Component } from 'react';
import { Card, InputBase, Avatar, Tooltip, CardContent, Popper, Paper, ClickAwayListener, Button, Chip, Divider } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import ImageUpload from './imageUploadComponent';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getAllNotes, editNote, archiveNotes, colorNotes, reminderNotes } from '../services/noteServices';
import { withRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import MoreMenu from '../components/moreComponent';
import ColorComponent from '../components/colorComponent';
import Collaborators from '../components/collaboratorComponents';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import TagFacesIcon from '@material-ui/icons/TagFacesOutlined';

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
            anchorEl: false,
            click: false,
            selectedDate: new Date()

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
            //console.log("res in editNote", res);
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
            //console.log("res in archiveNotes", res)
            this.handleGetNotes()
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
            //console.log("res in colorNotes", res);
            this.handleGetNotes()
        })
            .catch(err => {
                console.log("err in colorNote component ", err);
            });
    }
    handleReminder = (e, reminder, noteId) => {
        let data = {
            reminder: reminder,
            noteIdList: [noteId]
        }
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
        console.log("res in reminderData", data);
        reminderNotes(data).then(res => {
            //console.log("res in reminderNotes", res);
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
    handleOpenReminder = () => {
        this.setState({
            click: !this.state.click
        })
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
        //console.log("remifvgfgvyghvb"+this.state.selectedDate)
    };
    handleSave = () => {
        let dateTime = this.state.selectedDate
        //console.log("dateTime", dateTime)
        if (dateTime !== '') {
            this.setState({
                reminder: dateTime,
                click: false
            });
            //console.log("reminder", this.state.reminder);
        };
    };
    handleListenerClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    sendImage = (value) => {
        let file = value.toString()
        this.setState({
            imageUrl: file
        })
    }
    render() {
        let iconList = this.props.iconSelect ? "gridViewCss" : "listViewCss"
        let listViewShow = this.props.iconSelect ? "gridView" : "listView"
        return (
            <div className="main-getNote">
                {!this.state.open ? (
                    <div className={iconList}>
                        {
                            this.state.notes.filter(titleDescriptionSearch(this.props.searchText)).map(key => {
                                return (
                                    key.isArchived === false && key.isDeleted === false &&
                                    <div className="allNotes">
                                        <div className="getCardNote">
                                            <Card className={listViewShow} style={{ borderRadius: '10px', backgroundColor: key.color, margin: '8px', padding: '10px' }}>
                                                <div>
                                                    {}
                                                </div>
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
                                                {key.reminder.length > 0 ?
                                                    <div onClick={this.handleOpenDialogue} id="reminderStyle">
                                                        <AccessAlarmsIcon />
                                                        <InputBase

                                                            value={key.reminder.toString().slice(0, 24)}
                                                            multiline
                                                            onClick={() => this.handleEditNote(key.title, key.description, key.color, key.id)} />
                                                    </div>
                                                    : null
                                                }
                                                <div className="labelAndCollaborator">
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
                                                    <div className="getLabel" >
                                                        {key.noteLabels.map(data => {
                                                            //console.log("labels all data", data);
                                                            return (
                                                                <Tooltip title="Label">
                                                                    <Chip style={{ backgroundColor: "rgba(0,0,0,0.08)", margin: "5px" }} className="chip" onDelete={() => this.handleDelete(key.id, data.id)}
                                                                        icon={<TagFacesIcon style={{ color: "black" }} />}
                                                                        label={data.label}>
                                                                    </Chip>
                                                                </Tooltip>
                                                            );
                                                        })
                                                        }
                                                    </div>
                                                </div>

                                                <div className="imageIconCard">
                                                    <div style={{ cursor: 'pointer' }}><AddAlertIcon onClick={(e) => this.handleReminder(e, key.reminder, key.id)} />
                                                    </div>
                                                    <div><Collaborators noteId={key.id} /></div>
                                                    <div><ColorComponent
                                                        colorPatter={this.handleChangeColor}
                                                        noteId={key.id} /></div>
                                                    <div><ImageUpload imageUploadProps={this.sendImage} /></div>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => this.handleArchiveNotes(key.id)} notecolor={key.color}><ArchiveIcon /></div>
                                                    <div><MoreMenu
                                                        noteId={key.id}
                                                        title={key.title}
                                                        description={key.description}
                                                        questionAndAnswerNotes={key.questionAndAnswerNotes}
                                                        createLabelPropsTogetNote={this.handleCreateLabel} />
                                                    </div>
                                                </div>
                                                <CardContent>{
                                                    <div className="showQuestion">
                                                        {(key.questionAndAnswerNotes.length > 0) &&
                                                            <div className="ques-asked" style={{ padding: "5px" }}>
                                                                <Divider />
                                                                <b className="quesHeanding">
                                                                    asked Question
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
                                    </div>
                                )
                            })
                        }
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

                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
                    <Paper>
                        <ClickAwayListener onClickAway={this.handleListenerClose}>
                            <MenuList>
                                <MenuItem >Toady</MenuItem>
                                <MenuItem >Tomorrow</MenuItem>
                                <MenuItem >Next week</MenuItem>
                                <MenuItem onClick={this.handleOpenReminder}>Pick date & time</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
                <Dialog
                    open={this.state.click}
                    onClose={this.handleOpenReminder}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}  >
                        <div style={{ padding: '15px' }}>
                            <div>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="MM/dd/yyyy"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </div>
                            <div>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Time picker"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={this.handleSave}>Save</Button>
                            </div>
                        </div>
                    </MuiPickersUtilsProvider>
                </Dialog>
            </div>
        );
    }
}
export default withRouter(GetNotes)
