import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { InputBase, Card } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DrawerComponent from '../component/drawer.jsx';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import MoreMenu from '../component/moreComponent';
import { getAllNotes } from '../sercvice/userService';
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
export default class Archive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerOpen: false,
            open: false,
            notes: []
        }
    }
    openDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }
    handleOpenDialogue = () => {
        this.setState({
            open: !this.state.open
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
        return (
            <div>
                <div className="root">
                    <MuiThemeProvider theme={theme}>
                        <AppBar>
                            <Toolbar>
                                <div className="Icon">
                                    <div>
                                        <IconButton className="menuButton" onClick={this.openDrawer}>
                                            <MenuIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        <img src={require('../assets/keep.jpeg')} style={{ width: '30px', height: '30px' }} />
                                    </div>
                                    <div style={{ color: "black", cursor: "pointer" }}>
                                        <Typography className="title" variant="h6">
                                            Archive </Typography>
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
                                        <div>
                                            <IconButton>
                                                <Refresh onClick={this.handleReload} />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <IconButton>
                                                <ViewAgenda />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <IconButton>
                                                <SettingsIcon />
                                            </IconButton>
                                        </div>
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
                            <DrawerComponent
                                drawerOpen={this.state.drawerOpen}
                            />
                        </AppBar>
                    </MuiThemeProvider>
                </div>
                <div className="allNotes">
                    <div className="trashNote">
                        {
                            this.state.notes.map(key => {
                                if (key.isArchived === true && key.isDeleted !== true) {
                                    return (
                                        <div className="getCardNote">
                                            <Card className="getcard" style={{ boxShadow: "0px 0px 7px 0px", border: "1px solid black", borderRadius: '10px' }}>
                                                <div onClick={this.handleOpenDialogue}>
                                                    <InputBase
                                                        value={key.title}
                                                        multiline
                                                    />
                                                </div>
                                                <div onClick={this.handleOpenDialogue}>
                                                    <InputBase
                                                        value={key.description}
                                                        multiline
                                                    />
                                                </div>
                                                <div className="imageIconCard">
                                                <div><AddAlertIcon /></div>
                                                <div><PersonAddIcon /></div>
                                                <div><ColorLensIcon /></div>
                                                <div><ImageIcon /></div>
                                                <div><ArchiveIcon /></div>
                                                <div><MoreMenu /></div>

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
