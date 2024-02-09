import React from 'react';
import { connect } from 'react-redux';

export class TextEditorCon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }
  render() {
    return (
      <div>Your component JSX</div>
    );
  }
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(TextEditorCon);
