import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import { Button, Card } from '@material-ui/core';

class SignOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: false,
        }
    }
    handleprofile = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }
    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleLogOut = () => {
        localStorage.clear()
        this.props.history.push("/")
    }
    render() {
        return (
            <div>
                <div onClick={(e) => this.handleprofile(e)}>
                    <AccountCircle />
                </div>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
                    <Card className="Profile">
                        <div style={{ marginTop: '20px' }}>
                            <IconButton>
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <Button onClick={this.handleLogOut}>Sign out</Button>
                            </ClickAwayListener>
                        </div>
                    </Card>
                </Popper>
            </div>
        );
    }
}
export default withRouter(SignOut)
