import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Popper, Button, Card } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { imageUpload } from '../services/userService';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
const url = "http://fundoonotes.incubation.bridgelabz.com/"
class ProfileImgComponenet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: false,
            open: false,
            profilePic: localStorage.getItem('imageUrl'),
        };
    }
    handleProfileUpload = async (e) => {
        console.log("profile pic", e.target.files[0]);
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        await imageUpload(formData).then((res) => {
            console.log("--------------------", this.state.res);
            this.setState({
                profilePic: url + res.data.status.imageUrl,
            })
            localStorage.setItem("imageUrl", this.state.profilePic);
            console.log("finially upload profile pic", this.state.profilePic);
        }).catch((err) => {
            console.log("Error Occur while hetting upload profile pic back-end Api", err);

        })
    }
    handleImage = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target,
        })
    }
    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }
    handleSignOut = () => {
        localStorage.clear()
        this.props.history.push('/')
    }
    render() {
        const { anchorEl } = this.state;
        return (
            <div>
                <div className="Profile-root" >
                    <Popper open={anchorEl} anchorEl={anchorEl} style={{ zIndex: "999" }}>
                        <Card className='Profile' style={{ backgroundColor: 'gray' }}>
                            <div className="profileUpload">
                                <input type="file" onChange={(e) => this.handleProfileUpload(e)}></input>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div> <b>{localStorage.getItem('firstName')}</b></div>
                                    <div style={{ marginLeft: '8px' }}>
                                        <b> {localStorage.getItem('lastName')}</b>
                                    </div>
                                </div>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    {localStorage.getItem('email')}
                                </div>
                            </div>
                            <ClickAwayListener onClickAway={this.handleClose}>
                                <div className="profilebutton">
                                    <Button
                                        onClick={this.handleSignOut}
                                        color='primary'>SignOut</Button>
                                </div>
                            </ClickAwayListener>
                        </Card>
                    </Popper>
                </div>
                <div>
                    <Avatar alt="logo" src={this.state.profilePic} onClick={(e) => this.handleImage(e)} />
                </div>
            </div>
        )
    }
}
export default withRouter(ProfileImgComponenet)
