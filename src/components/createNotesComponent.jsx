import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import { InputBase, Tooltip } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBoxOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createNotes } from '../services/noteServices';
import ColorComponent from './colorComponent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import { Dialog, Button } from '@material-ui/core';
import Collaborators from './collaboratorComponents';
export default class TakeNotes extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            color: '',
            anchorEl: false,
            anchorElLabel: false,
            open: false,
            reminder: '',
            click: false,
            openCheckBox: false,
            selectedDate: new Date(),
            checkList: [],
            // '2014-08-18T21:11:54'
        }
    }
    handleOpenCheckBox = (e) => {
        this.setState({
            openCheckBox: this.state.openCheckBox ? false : e.target
        })
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
        //console.log("remifvgfgvyghvb"+this.state.selectedDate)
    };
    handleReminder = (e, value) => {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target,
            reminder: value
        });
    };
    handleMoreVertical = (e) => {
        this.setState({
            anchorElLabel: this.state.anchorElLabel ? false : e.target,
        });
    }
    handleListenerClose = () => {
        this.setState({
            anchorEl: false
        });
    };
    handleListenerClose1 = () => {
        this.setState({
            anchorElLabel: false
        });
    };
    handleOpenDialogue = () => {
        this.setState({
            click: true
        })
    }
    handleListnerInput = () => {
        this.setState({
            open: false
        })
    }
    handleListnerInputCheckBox = () => {
        this.setState({
            openCheckBox: false
        })
    }
    handleOpenInput = (e) => {
        this.setState({
            open: this.state.open ? false : e.target
        })
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
    handleColor = (color) => {
        this.setState({
            color: color
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
            openCheckBox: false,
            title: '',
            description: '',
            color: '',
            reminder: '',
        })
        let data = {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color,
            reminder: this.state.reminder
        }
        console.log("=========>", data);
        createNotes(data)
            .then(res => {
                console.log("res in create---------", res);
            })
            .catch(err => {
                console.log("err in createNotes component ", err);
            });
    }
    handleSave = () => {
        let dateTime = this.state.selectedDate
        console.log("dateTime", dateTime)
        if (dateTime !== '') {
            this.setState({
                reminder: dateTime,
                click: false
            });
            console.log("reminder", this.state.reminder);
        };
    };
    render() {
        return (
            <div>
                {this.state.openCheckBox ? (
                    <div className="Take_Note" >
                        <ClickAwayListener onClickAway={this.handleListnerInputCheckBox}>
                            <Card className="card_Notes" style={{ backgroundColor: this.state.color, boxShadow: "0px 0px 7px 0px" }}  >
                                <div>
                                    <b><InputBase
                                        placeholder="Title"
                                        value={this.state.title}
                                        onChange={this.handleTitle} /></b>
                                </div>
                                <Divider />
                                <div className="inputNote">
                                    <InputBase
                                        placeholder="+ List item"
                                        value={this.state.description}
                                        onChange={this.handleDescription} />
                                </div>
                                <Divider />
                                <div className="imageAndClose">
                                    <div className="imageIcon">
                                        <Tooltip title="Remind me">
                                            <div style={{ cursor: 'pointer' }} onClick={(e, value) => this.handleReminder(e, value)} ><AddAlertIcon /></div>
                                        </Tooltip>
                                        <Tooltip title="Collborator">
                                            <div><PersonAddIcon /></div>
                                        </Tooltip>
                                        <Tooltip title="Change color">
                                            <div><ColorComponent
                                                colorPatter={this.handleColor} /></div>
                                        </Tooltip>
                                        <Tooltip title="Add image">
                                            <div><ImageIcon /></div>
                                        </Tooltip>
                                        <Tooltip title="Archive">
                                            <div><ArchiveIcon /></div>
                                        </Tooltip>
                                        <Tooltip title="more">
                                            <div><MoreVertIcon /></div>
                                        </Tooltip>
                                    </div>
                                    <div onClick={this.handleClose} style={{ cursor: 'pointer' }}>Close</div>
                                </div>
                            </Card>
                        </ClickAwayListener>
                    </div>)
                    :
                    this.state.open ?
                        (<div className="Take_Note" >
                            {/* <ClickAwayListener onClickAway={this.handleListnerInput}> */}
                                <Card className="card_Notes" style={{ backgroundColor: this.state.color, boxShadow: "0px 0px 7px 0px" }}  >
                                    <div>
                                        <b><InputBase
                                            placeholder="Title"
                                            value={this.state.title}
                                            onChange={this.handleTitle} /></b>
                                    </div>
                                    <div className="inputNote">
                                        <InputBase
                                            placeholder="Take a note..."
                                            value={this.state.description}
                                            onChange={this.handleDescription} />
                                    </div>
                                    <div>
                                        <InputBase
                                            value={this.state.reminder} />
                                    </div>
                                    <div className="imageAndClose">
                                        <div className="imageIcon">
                                            <Tooltip title="Remind me">
                                                <div style={{ cursor: 'pointer' }} onClick={(e, value) => this.handleReminder(e, value)} ><AddAlertIcon /></div>
                                            </Tooltip>
                                            <div><Collaborators /></div>
                                            <Tooltip title="Change color">
                                                <div><ColorComponent
                                                    colorPatter={this.handleColor} /></div>
                                            </Tooltip>
                                            <Tooltip title="Add image">
                                                <div><ImageIcon /></div>
                                            </Tooltip>
                                            <Tooltip title="Archive">
                                                <div><ArchiveIcon /></div>
                                            </Tooltip>
                                            <div style={{ cursor: 'pointer' }}><MoreVertIcon onClick={(e) => this.handleMoreVertical(e)} /></div>
                                        </div>
                                        <div onClick={this.handleClose} style={{ cursor: 'pointer' }}>Close</div>
                                    </div>
                                </Card>
                            {/* </ClickAwayListener> */}
                        </div>) :
                        <div className="Take_Note" >
                            <Card className="card_Note" style={{ boxShadow: "0px 0px 7px 0px" }}>
                                <div>
                                    <InputBase onClick={(e) => this.handleOpenInput(e)}
                                        placeholder="Take a note..." />
                                </div>
                                <div className="icon_Take">
                                    <div><CheckBoxIcon onClick={(e) => this.handleOpenCheckBox(e)} /></div>
                                    <div><EditIcon /></div>
                                    <div><ImageIcon /></div>
                                </div>
                            </Card>
                        </div>}

                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
                    <Paper>
                        <ClickAwayListener onClickAway={this.handleListenerClose}>
                            <MenuList>
                                <MenuItem >Toady</MenuItem>
                                <MenuItem >Tomorrow</MenuItem>
                                <MenuItem >Next week</MenuItem>
                                <MenuItem onClick={this.handleOpenDialogue}>Pick date & time</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
                <Dialog
                    open={this.state.click}
                    onClose={this.handleOpenDialogue}>
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
                <Popper open={this.state.anchorElLabel} anchorEl={this.state.anchorElLabel} style={{ zIndex: "999" }} >
                    <Paper>
                        <ClickAwayListener onClickAway={this.handleListenerClose1}>
                            <MenuList>
                                <MenuItem >Add label</MenuItem>
                                <MenuItem >Add drawing</MenuItem>
                                <MenuItem >Show checkboxes</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            </div>
        );
    }
}
