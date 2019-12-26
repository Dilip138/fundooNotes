import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { InputBase } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createNotes } from '../sercvice/userService';
export default class TakeNotes extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            trash: false,
            pinned: false,
            archive: false,
            reminder: '',
            open: false
        }
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleTitle = (event) => {
        let title = event.target.value
        this.setState({
            title: title
        })
    }
    handleDescription = (event) => {
        let description = event.target.value
        this.setState({
            description: description 
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
            title: '',
            description: ''
        })
        let data = {
            title: this.state.title,
            description: this.state.description,
        }
        console.log("=========>", data);
        createNotes(data)
            .then(res => {
                console.log("res in create---------", res);
            })
            .catch(err => {
                console.log("err in createNotes component ", err);
            });
    }
    render() {
        return (

            <div>
                {!this.state.open ? (
                    <div className="Take_Note" >
                        <Card className="card_Note" onClick={this.handleOpen} style={{ boxShadow: "0px 0px 7px 0px" }}>
                            <div>
                                <InputBase
                                    placeholder="Take a note..." />
                            </div>
                            <div className="icon_Take">
                                <div><CheckBoxIcon /></div>
                                <div><EditIcon /></div>
                                <div><ImageIcon /></div>
                            </div>
                        </Card>
                    </div>
                ) : (<div className="Take_Note" >
                    <Card className="card_Notes" style={{ boxShadow: "0px 0px 7px 0px" }}  >
                        <div>
                            <b><InputBase
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleTitle} /></b>
                        </div>
                        <div className="inputNote">
                            <InputBase
                                placeholder="Take a note..."
                                value={this.state.description}
                                onChange={this.handleDescription} />
                        </div>
                        <div className="imageAndClose">
                            <div className="imageIcon">
                                <div><AddAlertIcon /></div>
                                <div><PersonAddIcon /></div>
                                <div><ColorLensIcon /></div>
                                <div><ImageIcon /></div>
                                <div><ArchiveIcon /></div>
                                <div><MoreVertIcon /></div>
                            </div>
                            <div onClick={this.handleClose} style={{ cursor: 'pointer' }}>Close</div>
                        </div>
                    </Card>
                </div>)}
            </div>
        );
    }
}
