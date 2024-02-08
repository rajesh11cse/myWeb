import React, { Component } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
class TextEditor extends Component {
  render() {
    return (
      <div>
        <Editor editorClassName="editorClassName"/>
      </div>
    );
  }
}
export default TextEditor;