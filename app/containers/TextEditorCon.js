import React from 'react';
import { connect } from 'react-redux';
import Editor from '../components/Editor';

export class TextEditorCon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <Editor/>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(TextEditorCon);