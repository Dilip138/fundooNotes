import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grid from '@material-ui/core/Grid';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import { Dialog, Button } from '@material-ui/core';

export default class Takereminders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: false,
            open: false,
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
    handleClose = () => {
        this.setState({
            anchorEl: false
        });
    };
    handleOpenDialogue = (e) => {
        this.setState({
            open: true
        })
    }
    render() {
        return (
            <div>
                <div onClick={(e) => this.handleReminder(e)}>
                    <AddAlertIcon />
                </div>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
                    <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
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
                    open={this.state.open}
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
                                <Button>Save</Button>
                            </div>
                        </div>
                    </MuiPickersUtilsProvider>
                </Dialog>
            </div >
        );
    }
}
