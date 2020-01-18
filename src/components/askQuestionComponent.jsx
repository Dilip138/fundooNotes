import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Card, Button, Icon, Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DrawerComponent from '../components/drawer.jsx';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ProfileImgComponenet from './profileComponent';
import { askQuestion, getAllNotes, postLike } from '../services/noteServices.js';
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
      drawerOpen: false,
      open: false,
      isCanceled: false,
      questionAnswer: '',
      noteIdQuestion: '',
      quesId: '',
      message: '',
      notes: [],
      count: '',
      like: false
    }
  }
  componentDidMount() {
    this.getNotes()
  }
  getNotes = () => {
    getAllNotes().then(res => {
      this.setState({
        notes: res.data.data.data
      })
    })
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
  handleAskQuestion = () => {
    var data = {
      message: this.state.message,
      notesId: this.props.location.state.notesId
    }
    console.log("data occurs for ask", data);
    askQuestion(data).then(res => {
      console.log("response comming from que ans component ", res);
      this.setState({
        questionAnswer: res.data.data.details.message,
        open: false,
      })
      console.log("response========>", this.state.questionAnswer);
    }).catch(err => {
      console.log('err in ask question Api', err);
    })
  }
  handleLike = (id) => {
    let data = {
      id: id,
      like: !this.state.like
    }
    postLike(data).then(res => {
      console.log("res in like data", res)
    })
    this.setState({
      like: !this.state.like, 
      count: !this.state.count
    })
  }

  render() {
    let title = "", description = "", noteId = "", questionAndAnswerNotes = ""
    if (this.props.location.state !== undefined) {
      title = this.props.location.state.title
      description = this.props.location.state.description
      noteId = this.props.location.state.notesId
      questionAndAnswerNotes = this.props.location.state.questionAndAnswerNotes
    }
    console.log("res in renderData", noteId)
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
        {questionAndAnswerNotes === undefined ?
          (<div className="questionAndEditor">
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
            <div className="ask" onClick={() => this.handleAskQuestion()}>Ask..?</div>
          </div>) :

          (<div className="showAll" style={{ padding: "4em 7em 0em 7em" }}>
            {this.state.notes.map(data => {
              console.log("res in data for question answer", data);
              return (
                <div className="showQuestion">
                  {data.questionAndAnswerNotes.length > 0 && data.id === noteId &&
                    data.questionAndAnswerNotes.map(key => {
                      return (
                        <div className="messageAndLike">
                          <div className="ques-asked" style={{ borderTop: "1px solid", padding: "5px" }}>
                            <b className="quesHeanding">
                              asked Question
                    </b>
                            <div className="questionGetDispaly"
                              dangerouslySetInnerHTML={{ __html: key.message }}>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
            }
            <Divider />
            <div className="messageAndLike" style={{ display: 'flex' }}>
              <div className="selectNameAndMessage">
                <div className="selectName">
                  <div> {localStorage.getItem('firstName')}</div>
                  <div style={{ marginLeft: '4px' }}>{localStorage.getItem('lastName')} </div>
                  <div>{}</div>
                </div>
                {this.state.notes.map(data => {
                  console.log("res in data for question answer", data);
                  return (
                    <div className="showMessage">
                      {data.questionAndAnswerNotes.length > 0 && data.id === noteId &&
                        data.questionAndAnswerNotes.map(key => {
                          return (
                            <div className="message">
                              <div className="questionGetDispaly"
                                dangerouslySetInnerHTML={{ __html: key.message }}>
                              </div>
                              <div className="editor-thumb">
                                {/* <ReplyIcon onClick={() => this.handleReply(key)} /> */}
                                {key.like.length > 0 ?
                                  key.like.map(val => {
                                    return (
                                      val.like ?
                                        <div className="like">
                                          <ThumbUpIcon
                                            onClick={() => this.handleLike(key.id)}
                                            style={{ color: !this.state.count ? 'blue' : 'black' }} />
                                          {!this.state.count ? '1 likes' : '0 likes'}
                                          {/* <div>{key.createdDate}</div> */}
                                        </div>
                                        :
                                        <div className="like">
                                          <ThumbUpIcon
                                            onClick={() => this.handleLike(key.id)}
                                            style={{ color: !this.state.count ? 'black' : 'blue' }} />
                                          {!this.state.count ? '0 likes' : '1 likes'}
                                        </div>
                                    )
                                  }) :
                                  <div className="like">
                                    <ThumbUpIcon
                                      onClick={() => this.handleLike(key.id)}
                                      style={{ color: !this.state.count ? 'black' : 'blue' }} />
                                    {!this.state.count ? '0 likes' : '1 likes'}
                                  </div>
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
                }
              </div>
            </div>
          </div>
          )
        }

      </div>
    );
  }
}