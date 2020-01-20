import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { InputBase, Card, Dialog, Button, Paper, Popper, ClickAwayListener } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import ProfileImgComponenet from './profileComponent';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DrawerComponent from '../components/drawer.jsx';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreMenu from '../components/moreComponent';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import { getAllNotes } from '../services/noteServices';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
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
export default class Reminders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerOpen: false,
            open: false,
            notes: [],
            anchorEl: false,
            click: false,
            reminder: '',
            selectedDate: new Date()
        }
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
    handleOpenDialogue = () => {
        this.setState({
            click: !this.state.click
        })
    }
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
    render() {
        let iconList = this.state.click ? "gridViewCss" : "listViewCss"
        let listViewShow = this.state.click ? "gridView" : "listView"
        return (
            <div className="reminder">
                <div className="root">
                    <MuiThemeProvider theme={theme}>
                        <AppBar>
                            <Toolbar>
                                <div className="dashBoardIcon">
                                    <div className="icon">
                                        <MenuIcon onClick={this.openDrawer} />
                                    </div>
                                    <div>
                                        <img src={require('../assets/keep.jpeg')} alt="logo" style={{ width: '30px', height: '30px' }} />
                                    </div>
                                    <div style={{ color: "black", cursor: "pointer" }}>
                                        <Typography className="title" variant="h6">
                                            Reminders </Typography>
                                    </div>
                                </div>
                                <div className="searchAndIcon">
                                    <div className="search">
                                        <div>
                                            <SearchIcon style={{ color: "black" }} />
                                        </div>
                                        <div>
                                            <InputBase
                                                placeholder="Search…" />
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
                </div>
                <div className="allNotes" style={{ marginTop: '85px' }}>
                    <div className={iconList}>
                        {this.state.notes.map((key) => {
                            //console.log("key", key);
                            if (key.isArchived === false && key.isDeleted === false && key.reminder === undefined) {
                                return (
                                    <div className="getCardNote">
                                        <Card className={listViewShow} style={{ boxShadow: "0px 0px 7px 0px", borderRadius: '10px', backgroundColor: this.props.notecolor, padding: '10px', margin: '8px' }}>
                                            <div >
                                                <InputBase
                                                    value={key.title}
                                                    multiline
                                                />
                                            </div>
                                            <div >
                                                <InputBase
                                                    value={key.description}
                                                    multiline
                                                />
                                            </div>
                                            <div>
                                                <InputBase
                                                    value={key.reminder}
                                                    multiline
                                                    onClick={() => this.handleEditNote(key.title, key.description, key.color, key.id)} />
                                            </div>
                                            <div className="imageIconCard">
                                                <div style={{ cursor: 'pointer' }}><AddAlertIcon onClick={(e, value) => this.handleReminder(e, value)} /></div>
                                                <div><PersonAddIcon /></div>
                                                <div><ColorLensIcon /></div>
                                                <div><ImageIcon /></div>
                                                <div><ArchiveIcon /></div>
                                                <div><MoreMenu noteId={key.id} /></div>

                                            </div>
                                        </Card>
                                    </div>
                                )
                            }
                        })
                        }
                    </div>
                </div>
            </div>

        );
    }
}
