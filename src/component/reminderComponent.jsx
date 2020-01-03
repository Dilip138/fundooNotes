import React, { Component } from 'react';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import { Dialog, Button } from '@material-ui/core';
import {reminderNotes} from '../service/userService';

export default class Takereminder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: false,
            click: false,
            reminder: '',
            selectedDate: new Date()
        }
    }
    handleListenerClose = () => {
        this.setState({
            anchorEl: false
        });
    };
    handleDateChange = date => {
        this.setState({
            selectedDate: date
        });
        //this.props.addReminder(this.state.selectedDate)

        //console.log("remifvgfgvyghvb"+this.state.selectedDate)
    };
    handleReminder = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target,
        });

    };
    handleOpenDialogue = () => {
        this.setState({
            click: true
        })
    }
    handleSave = () => {
        let data = {
            noteIdList: [this.props.noteId],
            reminder: this.state.selectedDate
        }
        // let dateTime = this.state.selectedDate
        // console.log("dateTime", dateTime)
        console.log("res in reminderData", data);
        reminderNotes(data).then(res => {
            console.log("res in reminderNotes", res);
            this.props.reminderPropsToGetNotes(true)
        })
            .catch(err => {
                console.log("err in reminderComponent", err);
            });
    };
    render() {
        return (
            <div>
                <div onClick={(e) => this.handleReminder(e)}>
                    <AddAlertIcon />
                </div>
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
