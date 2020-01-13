import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Card, Button, Icon } from '@material-ui/core';
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
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ProfileImgComponenet from './profileComponent';
import { askQuestion } from '../services/noteServices.js';
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
      open: false,
      isCanceled: false,
      questionAnswer: '',
      noteIdQuestion: '',
      quesId: '',
      message: '',
      notes: [],
    }
  }
  openDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }
  onEditorStateChange = (e) => {
    let question = e.blocks[0].text
    this.setState({
      message: question
    })
  }
  handleSelectNotes = () => {
    this.props.history.push('/dashBoard')
  }
  handleAskQuestion = (value) => {
    var data = {
      message: this.state.message,
      notesId: this.props.location.state.notesId
    }
    console.log("data occurs for ask", data);
    askQuestion(data).then(res => {
      console.log("response comming from que ans component ", res);
      this.setState({
        questionAnswer: res.data.data.details.message,
        quesId: res.data.data.details.id,
        open: true,
        noteIdQuestion: res.data.data.details.notesId
      })
      console.log("response========>", this.state.questionAnswer);
    }).catch(err => {
      console.log('err in ask question Api', err);
    })
  }
  render() {
    let title = "", description = "", noteId = ""
    if (this.props.location.state !== undefined) {
      title = this.props.location.state.title
      description = this.props.location.state.description
      noteId = this.props.location.state.notesId
      console.log("title", title);
      console.log("description", description);
      console.log("description", noteId);
    }
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
                      <Refresh />
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
            <div>
              <h6>Selected Note</h6>
              <div>{title} {description}</div>
            </div>
            <div>{this.state.questionAnswer}</div>
          </div>
          <div className="closeQues">
            <Button onClick={this.handleSelectNotes}>Close</Button>
          </div>
        </Card>
        <div className="questionAndEditor">
          <div className="question">Ask a Question..?</div>
          <div className="editor">
            <Editor
              toolbar={{
                inline: { inDropdown: true, },
                link: { inDropdown: true },
                textAline: { inDropdown: true },
                list: { inDropdown: true },
                history: { inDropdown: true }
              }}
              onChange={(event) => this.onEditorStateChange(event)}
            />
          </div>
          <div className="ask" onClick={() => this.handleAskQuestion(noteId)}>Ask..?</div>
        </div>
      </div>
    );
  }
}