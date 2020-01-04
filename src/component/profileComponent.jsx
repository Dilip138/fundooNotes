import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Paper, Popper, Button, Card } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { imageUpload } from '../service/userService';
import Fade from '@material-ui/core/Fade';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
const url = "http://fundoonotes.incubation.bridgelabz.com/"
export class ProfileImgComponenet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
            profilePic: localStorage.getItem('imageUrl'),
            openAvtar: false
        };
    }
    handleClick = placement => event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open, placement,
        }));
    };
    handleProfile = async (e) => {
        console.log("profile pic", e.target.files[0]);
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        await imageUpload(formData).then((res) => {
            console.log("--------------------", this.state.res);
            console.log("res coming while hitting back-end Api", res.data.status.imageUrl);
            this.setState({
                profilePic: url + res.data.status.imageUrl,
                openAvtar: false
            })
            localStorage.setItem("imageUrl", this.state.profilePic);
            console.log("finially upload profile pic", this.state.profilePic);
        }).catch((err) => {
            console.log("Error Occur while hetting upload profile pic back-end Api", err);

        })

    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleMore = (e) => {
        console.log("notes id is ", this.props.notesId);

        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target,
            open: true,
            trashNotesId: this.props.notesId
        });
    }
    handleSignOut = () => {
        localStorage.clear()
        this.props.history.push('/')
    }


    handleAvtarOpen = () => {
        this.setState({
            openAvtar: true
        })
    }
    // onChange(e) {
    //     console.log("event targer", e.target.files[0])
    // }
    render() {
        const { anchorEl, open, placement } = this.state;
        return (
            <div className="Profile-root" >
                <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ zIndex: "999" }}>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350} >
                            <Card className='Profile' style={{ backgroundColor: 'gray' }}>
                                {!this.state.openAvtar ? (
                                    <div onClick={this.handleAvtarOpen} className="profileUpload">
                                        <Avatar alt="logo" src={this.state.profilePic} />
                                    </div>
                                ) : (
                                        <div className="profileUpload">
                                            <input type="file" onChange={this.handleProfile} />
                                        </div>
                                    )
                                }

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div> <b>{localStorage.getItem('firstName')}</b></div>
                                        <div style={{ marginLeft: '8px' }}>
                                            <b> {localStorage.getItem('lastName')}</b>
                                        </div>
                                    </div>
                                    <div className="colabEmail" >
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
                        </Fade>
                    )}
                </Popper>
                <div>
                    <Avatar alt="logo" src={this.state.profilePic} onClick={this.handleClick('bottom')} />
                </div>
            </div>
        )
    }
}
export default withRouter(ProfileImgComponenet)