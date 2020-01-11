import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Card, Button, Icon } from '@material-ui/core';
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
import DashboardIcon from '@material-ui/icons/Dashboard';
import DrawerComponent from '../components/drawer.jsx';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
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

export default class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentState: '',
      drawerOpen: false,
    }
  }
  openDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }
  onContentStateChange = (contentState) => {
    this.setState({
      editorState: contentState
    });
  };
  handleReload = () => {
    window.location.reload()
  }
  render() {
    return (
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
                    <Icon>
                      <Refresh onClick={this.handleReload} />
                    </Icon>
                  </div>
                  {!this.state.open ?
                    (<div className="iconGrid-List">
                      <Icon>
                        <DashboardIcon onClick={this.gridList} />
                      </Icon>
                    </div>) :
                    (<div style={{ color: 'black' }}>
                      <Icon>
                        <ViewAgenda onClick={this.gridList} />
                      </Icon>
                    </div>)}
                  <div style={{ color: 'gray' }}>
                    <Icon>
                      <SettingsIcon />
                    </Icon>
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
        <Card className="cardQuestion">
          <div className="selectNoteQues">
            <h6>Selected Note</h6>
          </div>
          <div className="closeQues">
            <Button>Close</Button>
          </div>
        </Card>
        <div className="questionAndEditor">
          <div className="question">Ask a Question..?</div>
          <div className="editor">
            <Editor
              initialContentState={this.state.contentState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onContentStateChange={this.onContentStateChange}
            />
          </div>
          <div className="ask">Ask..?</div>
        </div>
      </div>
    );
  }
}