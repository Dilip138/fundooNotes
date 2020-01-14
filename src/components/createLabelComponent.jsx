import React, { Component } from 'react';
import { ClickAwayListener, InputBase, Checkbox, List, Divider, Menu, } from '@material-ui/core';
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
            allLabels: [],
            filteredCheckBoxs: [],
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
    handleSearch = () => {
        const filteredCheckBox = this.state.allLabels.filter((key)=>{
            return key.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1
        })
        this.setState({
            filteredCheckBoxs: filteredCheckBox,
        })
        console.log("res in filtered", this.state.filteredCheckBoxs)
    }

    checkNoteLabels = (labelId) => {
        let data = {
            labelId: labelId,
            noteId: this.props.noteIdLabel
        }
        noteLabels(data).then(res => {
            console.log("res in noteLabels data", res);
        })
    }
    render() {
        let labelData = this.state.allLabels.map(key => {
            console.log("res in keyFilter",key)
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
            <div className="labelCard">
                <div onClick={(e) => this.handleMoreVertical(e)} className="">Add label</div>
                <MuiThemeProvider theme={theme}>
                    <Menu open={this.state.anchorElLabel} anchorEl={this.state.anchorElLabel} style={{ zIndex: "999" }} onKeyDown={this.handleClear} >
                        <div className="dialogLabel">
                            <div>
                                <p>Label note</p>
                            </div>
                            <ClickAwayListener onClickAway={this.handleListenerClose}>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <InputBase
                                            placeholder="Enter label name"
                                            value={this.state.label}
                                             onKeyDown={this.handleSearch}
                                            onChange={this.handleChangeLabel} />
                                    </div>
                                    <div>
                                        <SearchIcon style={{ color: "black", alignItems: 'center' }} />
                                    </div>
                                </div>
                            </ClickAwayListener>
                            <div> {labelData}</div>
                            <div classNam="createLabel">
                                {this.state.clear ?
                                    (<p onClick={this.handleCreateLabel} style={{ cursor: 'pointer' }}><span>+ create "{this.state.label}"</span></p>)
                                    : (null)}
                            </div>
                        </div>
                    </Menu>
                </MuiThemeProvider>
            </div>
        );
    }
}
