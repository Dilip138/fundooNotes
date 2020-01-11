import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import ProfileImgComponenet from './profileComponent';
import DrawerComponent from '../components/drawer.jsx';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Card, InputBase } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
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
export default class Trash extends Component {
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
            <div className="trash">
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
                <div className="allNotes">
                    <div className="trashNote">
                        {
                            this.state.notes.map(key => {
                                if (key.isDeleted === true) {
                                    return (
                                        <div className="getCardNote">
                                            <Card className="getcard" style={{ borderRadius: '10px', width: '20em' }}>
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
                                                <div className="imageIconTrash">
                                                    <div><DeleteForeverIcon /></div>
                                                    <div><RestoreFromTrashIcon /></div>
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
