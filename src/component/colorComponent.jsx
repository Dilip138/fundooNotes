import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ColorLensIcon from '@material-ui/icons/ColorLensOutlined';
import { Tooltip, IconButton } from '@material-ui/core';
const colorPattern = [
    {
        colorName: "white",
        colorCode: "rgb(255, 255, 255)"
    },
    {
        colorName: "green",
        colorCode: "rgb(242, 139, 130)"
    },
    {
        colorName: "red",
        colorCode: "rgb(215, 174, 251)"
    },
    {
        colorName: "blue",
        colorCode: "rgb(255, 192, 203)"
    },
    {
        colorName: "purple",
        colorCode: "rgb(167, 255, 235)"
    },
    {
        colorName: "pink",
        colorCode: "rgb(251, 188, 4)"
    },
    {
        colorName: "orange",
        colorCode: "rgb(174, 203, 250)"
    },
    {
        colorName: "yellow",
        colorCode: "rgb(232, 234, 237)"
    },
    {
        colorName: "brown",
        colorCode: "rgb(203, 240, 248)"
    },
    {
        colorName: "grey",
        colorCode: "rgb(230, 201, 168)"
    },
    {
        colorName: "Teal",
        colorCode: "rgb(255, 255, 0)"
    },
    {
        colorName: "Dark blue",
        colorCode: "rgb(204, 255, 144)"
    }
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
                <div>
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
