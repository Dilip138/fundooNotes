import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import { InputBase, Tooltip, Input } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBoxOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createNotes } from '../service/userService';
import ColorComponent from '../component/colorComponent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import { Dialog, Button } from '@material-ui/core';
export default class TakeNotes extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            color: '',
            anchorEl: false,
            open: false,
            reminder: '',
            click: false,
            selectedDate: new Date('2014-08-18T21:11:54'),
        }
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };
    handleReminder = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target,
        });
    };
    handleListenerClose = () => {
        this.setState({
            anchorEl: false
        });
    };
    handleOpenDialogue = () => {
        this.setState({
            click: true
        })
    }
    handleSave = () => {
        let dateTime = this.state.selectedDate
        console.warn(dateTime + " in take date")
        if (dateTime !== '') {
            this.setState({
                reminder: dateTime,
                click: false
            });
        };
    };
    handleOpen = () => {
        this.setState({
            open: true
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
            title: '',
            description: '',
            color: ''
        })
        let data = {
            title: this.state.title,
            description: this.state.description,
            color: this.state.color
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
    render() {
        return (
            <div>
                {!this.state.open ? (
                    <div className="Take_Note" >
                        <Card className="card_Note" onClick={this.handleOpen} style={{ boxShadow: "0px 0px 7px 0px" }}>
                            <div>
                                <InputBase
                                    placeholder="Take a note..." />
                            </div>
                            <div className="icon_Take">
                                <div><CheckBoxIcon /></div>
                                <div><EditIcon /></div>
                                <div><ImageIcon /></div>
                            </div>
                        </Card>
                    </div>
                ) : (<div className="Take_Note" >
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
                                    <div onClick={(e) => this.handleReminder(e)}><AddAlertIcon /></div>
                                </Tooltip>
                                <Tooltip title="Collborator">
                                    <div><PersonAddIcon /></div>
                                </Tooltip>
                                <Tooltip title="Change color">
                                    <div><ColorComponent
                                        colorPatter={this.handleColor}
                                    /></div>
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
                </div>)}

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
            </div>
        );
    }
}
