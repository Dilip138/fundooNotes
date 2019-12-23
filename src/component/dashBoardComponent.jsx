import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: "white"
            }
        }
    }
})
class DashBoard extends Component {

    render() {
        return (
            <div className="root">
                <MuiThemeProvider theme={theme}>
                    <AppBar>
                        <Toolbar>
                            <div style={{ position: 'relative', display: 'flex' }}>
                                <div>
                                    <IconButton className="menuButton">
                                        <MenuIcon />
                                    </IconButton>
                                </div>
                                <div style={{ color: "black", cursor: "pointer" }}>
                                    <Typography className="title" variant="h6">
                                        fundooNotes </Typography>
                                </div>
                            </div>
                            <div style={{ border: "1px solid black", borderRadius: "12px", background: "#a79d9d63", display: 'flex', minWidth: '234px' }}>
                                <div className="searchIcon">
                                    <SearchIcon style={{ color: "black" }} />
                                </div>
                                <div>
                                    <InputBase
                                        placeholder="Search…" />
                                </div>
                            </div>
                            <div className="grow" />
                            <div className="sectionDesktop">
                                <div style={{ flexDirection: "row" }}>
                                    <IconButton>
                                        <Refresh />
                                    </IconButton>
                                </div>
                                <div style={{ flexDirection: "row" }}>
                                    <IconButton>
                                        <ViewAgenda />
                                    </IconButton>
                                </div>
                                <div style={{ flexDirection: "row" }}>
                                    <IconButton>
                                        <SettingsIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div>
                                <IconButton
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                >
                                    <AccountCircle style={{ color: "black" }} />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}


export default DashBoard;