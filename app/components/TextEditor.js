import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
class TextEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    // this.onContentStateChange = this.onContentStateChange.bind(this);
  }
  onEditorStateChange(editorState) {
    this.setState({ editorState: editorState });
  }

  render() {
    const { editorState } = this.state;
    console.log("editorState == > ", editorState);
    return (
      <div>
        <Editor
          editorState={editorState}
          // initialEditorState={editorState}
          editorClassName="editor-editor-text"
          onEditorStateChange={this.onEditorStateChange}
          // onContentStateChange={this.onContentStateChange}
        />
        <div className="sidebar">{/* Another sidebar content */}</div>
      </div>
    );
  }
}
export default TextEditor;
