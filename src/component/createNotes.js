import React, { Component } from 'react';

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
        }
    }
    
    render() {
        return (
            <div>
                <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                    value={this.state.title}
                    onChange={this.handleTitleChange} />
                <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    value={this.state.description}
                    onChange={this.handleDescriptionChange} />
            </div>
        );
    }
}
