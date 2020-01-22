import React, { Component } from 'react';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import {Tooltip } from '@material-ui/core';
const url = "http://fundoonotes.incubation.bridgelabz.com/"

export default class imageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: '',
        }
    }
    handleProfile = async (event) => {
        console.log("images selected", event.target.files[0]);
        let value = url + event.target.files[0].name
        //console.log("res in image",image);       
       await this.setState({
            imageUrl: value
        })
        this.props.imageUploadProps(this.state.imageUrl)
        console.log("res in imageUrl",this.state.imageUrl)
    }
    render() {
        return (
            <div className="main-inputImage">
                <div>
                    <label for="image">
                        <Tooltip title="Add image">
                            <ImageIcon style={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </label>
                    <input type="file" id="image" onChange={(event) => this.handleProfile(event)} style={{ display: 'none' }} />
                </div>
            </div>
        );
    }
}
