import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Card, Button } from '@material-ui/core';
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
      editorState: EditorState.createEmpty(),
    }
  }
  onContentStateChange = (editorState) => {
    this.setState({
      editorState: editorState
    });
  };
  handleReload = () => {
    window.location.reload()
  }
  render() {
    return (
      <div className="root" style={{backgroundColor:'gray'}}>
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
                  <div>
                    <IconButton>
                      <Refresh onClick={this.handleReload} />
                    </IconButton>
                  </div>
                  {!this.state.open ?
                    (<div>
                      <IconButton>
                        <DashboardIcon onClick={this.gridList} />
                      </IconButton>
                    </div>) :
                    (<div>
                      <IconButton>
                        <ViewAgenda onClick={this.gridList} />
                      </IconButton>
                    </div>)}
                  <div>
                    <IconButton>
                      <SettingsIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div>
                <IconButton  >
                  <ProfileImgComponenet />
                </IconButton>
              </div>
            </Toolbar>
            <DrawerComponent
              drawerOpen={this.state.drawerOpen}
            />
          </AppBar>
        </MuiThemeProvider>
        <Card className="cardQuestion">
          <div  className="selectNoteQues">
            <h6>Selected Note</h6>
          </div>
          <div className="closeQues">
            <Button>Close</Button>
          </div>
        </Card>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onContentStateChange={this.onContentStateChange}
          />
        </div>
      </div>
    );
  }
}