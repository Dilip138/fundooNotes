import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ColorLensIcon from '@material-ui/icons/ColorLensOutlined';
import { Tooltip, IconButton } from '@material-ui/core';
const colorPattern = [
    { colorName: "Red", colorCode: "#ef9a9a" },
    { colorName: "Cyan", colorCode: "#80deea" },
    { colorName: "Blue", colorCode: "#2196f3" },
    { colorName: "Indigo", colorCode: "#9fa8da" },
    { colorName: "LightBlue", colorCode: "#90caf9" },
    { colorName: "Purple", colorCode: "#b39ddb" },
    { colorName: "Yellow", colorCode: "#c5e1a5" },
    { colorName: "Lime", colorCode: "#e6ee9c" },
    { colorName: "Pink", colorCode: "#f48fb1" },
    { colorName: "gray", colorCode: "#eeeeee" },
    { colorName: "Brown", colorCode: "#bcaaa4" },
]
export default class ColorComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: false
        };
    };
    handleChangeColor = (e) => {
        this.props.colorPatter(e.target.value, this.props.noteId)
    }
    handleColor = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target,
        })
    }
    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    render() {
        let colorChange = colorPattern.map(key => {
            return (
                <div className="colorNote">
                    <Tooltip title={key.colorName}>
                        <IconButton style={{ backgroundColor: key.colorCode }}
                            value={key.colorCode}
                            onClick={this.handleChangeColor}>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })
        return (
            <div className="colorCode">
                <Tooltip title="Color change">
                    <ClickAwayListener onClickAway={this.handleClose} >
                        <ColorLensIcon onClick={(e) => this.handleColor(e)} cursor="pointer" />
                    </ClickAwayListener>
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
                    <Paper className="colorPaper">
                        {colorChange}
                    </Paper>
                </Popper>
            </div>
        )
    }
}
