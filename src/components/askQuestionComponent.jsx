import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

export default class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState:EditorState.createEmpty(),
    }
  }
  onContentStateChange=(editorState) => {
    this.setState({
        editorState:editorState
    });
  };
  render() {
    return (
      <div style={styles.editor}>
        <Editor
        editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onContentStateChange={this.onContentStateChange}
        />
      </div>
    );
  }
}
const styles = {
    editor: {
        display: 'flex',
        border: '1px solid gray',
        flexDirection: 'column',
        marginTop: '15px',
       
    }
};