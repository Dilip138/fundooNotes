import React, { Component } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { Button, Card, Avatar, Dialog } from '@material-ui/core';
import { imageUpload } from '../service/userService';
const url = "http://fundoonotes.incubation.bridgelabz.com/"

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            file: '',
            image: localStorage.getItem('imageUrl'),
            open: false,
            anchorEl:false,
        }
    }
    handleImageChange(e) {
        // e.preventDefault();
        console.log("localStorage data", localStorage.getItem('imageUrl'));
        
        let file = e.target.files[0];
        let formData = new FormData();

        formData.append('file', file)
        imageUpload(formData).then(res => {
            console.log("res coming while hitting back-end Api", res.data.status.imageUrl);
            this.setState({
                profilePic: url + res.data.status.imageUrl,
                open: false
            })
            localStorage.setItem("imageUrl", this.state.image);
            console.log("finially upload profile pic", this.state.profilePic);
        }).catch((err) => {
            console.log("Error Occur while hetting upload profile pic back-end Api", err);

        })
    }
    handleprofile = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }
    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleLogOut = () => {
        localStorage.clear()
        this.props.history.push("/")
    }
    handleAvtarOpen = () =>{
        this.setState({
            open:true
        })
    }
    render() {
        return (
            <div>
                <div onClick={(e) => this.handleprofile(e)}>
                    <Avatar />
                </div>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{ zIndex: "999" }} >
                    <Card className="Profile" style={{ backgroundColor: 'gray' }}>
                        {!this.state.open ? 
                        (<div style={{ margin: '25px' }}onClick={this.handleAvtarOpen} >
                            <IconButton >
                                <Avatar src={this.state.image} />
                            </IconButton>
                        </div>) :
                            (<div>
                                <input className="fileInput"
                                    type="file"
                                    onChange={(e) => this.handleImageChange(e)} src={this.state.image} />
                            </div>)}
                        <div>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <Button onClick={this.handleLogOut}>Sign out</Button>
                            </ClickAwayListener>
                        </div>
                    </Card>
                </Popper>
            </div>
        );
    }
}
export default withRouter(Profile)