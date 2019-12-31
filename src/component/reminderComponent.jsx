import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grid from '@material-ui/core/Grid';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import { Dialog } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from '@material-ui/pickers';

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
            open: !this.state.open
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
                                <MenuItem onClick={this.handleOpenDialogue}>Pick date</MenuItem>
                                <MenuItem onClick={this.handleOpenDialogue}>Pic time</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
                <Dialog
                    open={this.state.open}
                    >
                    >
                    <Grid container className="grid" justify='space-around'>
                        <DatePicker onClick={this.handleOpenDialogue}
                            margin="normal"
                            label="Date picker"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                        />
                        <TimePicker
                            margin="normal"
                            label="Time picker"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                        />
                    </Grid>
                </Dialog>
            </div>
        );
    }
}
