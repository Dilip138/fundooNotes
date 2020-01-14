import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DrawerComponent from '../components/drawer.jsx';
import { createMuiTheme, MuiThemeProvider, ClickAwayListener } from '@material-ui/core';
import CreateNotes from './createNotesComponent';
import GetNoteComponent from '../components/getNoteComponent';
import ProfileImgComponenet from './profileComponent';
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: "white"
            }
        },
        MuiToolbar: {
            regular: {
                justifyContent: 'space-between'
            }
        },
        MuiDrawer: {
            paperAnchorDockedLeft: {
                marginTop: '4em',
                minWidth: '15em',
            }
        }
    }
})
class DashBoard extends Component {
    constructor() {
        super()
        this.state = {
            drawerOpen: false,
            open: false,
            searchNote: '',

        }
    }
    handleListenerClose = () => {
        this.setState({
            drawerOpen: false
        })
    }
    handleSearch = (event) => {
        const searchNote = event.target.value
        console.log("searchNote", searchNote)
        this.setState({
            searchNote: searchNote
        })
        console.log("serachNote in setState", this.state.searchNote);

    }
    gridList = () => {
        this.setState({
            open: !this.state.open
        })
    }
    openDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }
    handleReload = () => {
        window.location.reload()
    }
    render() {
        // let take = this.state.open ? ({display: 'flex',width:'46em',marginLeft:'18em'}) : ({display: 'flex',width:'71em',marginLeft:'4em'})
        return (
            <div className="root">
                <MuiThemeProvider theme={theme}>
                    <AppBar>
                        <Toolbar>
                            <div className="dashBoardIcon">
                                <ClickAwayListener onClickAway={this.handleListenerClose}>
                                    <div className="icon">
                                        <MenuIcon onClick={this.openDrawer} />
                                    </div>
                                </ClickAwayListener>
                                <div>
                                    <img src={require('../assets/keep.jpeg')} alt="logo" style={{ width: '30px', height: '30px' }} />
                                </div>
                                <div style={{ color: "black", cursor: "pointer" }}>
                                    <Typography className="title" variant="h6">
                                        fundooNotes </Typography>
                                </div>
                            </div>
                            <div className="searchAndIcon">
                                <div className="search">
                                    <div>
                                        <SearchIcon style={{ color: "black" }} />
                                    </div>
                                    <div>
                                        <InputBase
                                            placeholder="Search…"
                                            value={this.state.searchNote}
                                            onChange={this.handleSearch} />
                                    </div>
                                </div>
                                <div className="sectionDesktop">
                                    <div className="iconReaload">
                                        <Refresh onClick={this.handleReload} />
                                    </div>
                                    {!this.state.open ?
                                        (<div className="iconGrid-List">
                                            <DashboardIcon onClick={this.gridList} />
                                        </div>) :
                                        (<div className="iconGrid-List">
                                            <ViewAgenda onClick={this.gridList} />
                                        </div>)}
                                    <div style={{ color: 'gray' }}>
                                        <SettingsIcon />
                                    </div>
                                </div>
                            </div>
                            <div style={{ cursor: 'pointer' }}>
                                <ProfileImgComponenet />
                            </div>
                        </Toolbar>

                        <DrawerComponent
                            drawerOpen={this.state.drawerOpen}
                        />
                    </AppBar>
                </MuiThemeProvider>
                <div><CreateNotes /></div>
                {/* <div style={take}><GetNoteComponent /></div> */}
                <div><GetNoteComponent searchText={this.state.searchNote}  iconSelect={this.state.open}/></div>
            </div>
        );
    }
}

export default DashBoard;