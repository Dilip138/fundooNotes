import React, { Component } from 'react';
import { Popper, Paper, ClickAwayListener, InputBase, Checkbox, List, Divider, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { addNoteLabels, getNoteLabels, noteLabels } from '../services/noteServices';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
const theme = createMuiTheme({
    overrides: {
        MuiList: {
            padding: {
                paddingTop: '0px',
                paddingBottom: '0px',
            }
        },
    }
})

export default class CraeteLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorElLabel: false,
            open: false,
            label: '',
            isDeleted: false,
            clear: false,
            createLabel: "",
            allLabels: []
        }
    }
    componentDidMount() {
        this.handleGetNoteLabels()
    }
    handleClear = () => {
        this.setState({
            clear: true
        })
    }
    handleMoreVertical = (e) => {
        this.setState({
            anchorElLabel: this.state.anchorElLabel ? false : e.target,
        });
        // this.props.craeteLabelToMore(true)
    }
    handleListenerClose = () => {
        this.setState({
            anchorElLabel: false
        })
    }
    handleChangeLabel = (event) => {
        this.setState({
            label: event.target.value
        })
    }
    handleCreateLabel = () => {
        let data = {
            isDeleted: false,
            label: this.state.label,
            userId: localStorage.getItem('userId')
        }
        console.log("res in createdata", data);

        addNoteLabels(data).then(res => {
            console.log("res in labeldata", res)
            this.setState({
                createLabel: res.data.label
            })
            console.log("create label response", this.state.createLabel);

        })
    }
    handleGetNoteLabels = () => {
        getNoteLabels().then(res => {
            console.log("response from get label api", res);
            this.setState({
                allLabels: res.data.data.details
            })
            console.log("response from get label api", this.state.allLabels);

        }).catch(err => {
            console.log("err occur while hetting back-end api", err);

        })

    }
    checkNoteLabels = (labelId) => {
        let data = {
            labelId: labelId,
            noteId: this.props.noteIdLabel
        }
        noteLabels(data).then(res => {
            console.log("res in noteLabels data", res);
            //this.props.createLabelPropsToMore(true)
        })
    }
    render() {
        let labelData = this.state.allLabels.map(key => {
            return (
                <div>
                    <List>
                        <Checkbox
                            value={key.label}
                            onClick={this.checkNoteLabels(key.id)}>
                        </Checkbox>
                        {key.label}
                    </List>
                </div>
            )
        })
        return (
            <div className="LabelCard">
                {/* <ClickAwayListener onClickAway={this.handleListenerClose}> */}
                <div onClick={(e) => this.handleMoreVertical(e)} className="">Add label</div>
                {/* </ClickAwayListener> */}
                <MuiThemeProvider theme={theme}>
                    <Popper open={this.state.anchorElLabel} anchorEl={this.state.anchorElLabel} style={{ zIndex: "999", marginTop: '6em' }} onKeyDown={this.handleClear} >
                        <Paper>
                            <div className="dialogLabel">
                                <div>
                                    <p>Label note</p>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <InputBase
                                            placeholder="Enter label name"
                                            value={this.state.label}
                                            onChange={this.handleChangeLabel} />
                                    </div>
                                    <div>
                                        <SearchIcon style={{ color: "black" }} />
                                    </div>
                                </div>
                                <div> {labelData}</div>
                                <div classNam="createLabel">
                                    {this.state.clear ?
                                        (<p onClick={this.handleCreateLabel} style={{ cursor: 'pointer' }}><span>+ create "{this.state.label}"</span></p>)
                                        : (null)}
                                </div>
                            </div>
                        </Paper>
                    </Popper>
                </MuiThemeProvider>
            </div>
        );
    }
}
