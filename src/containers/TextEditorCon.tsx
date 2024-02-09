import React from 'react';
import { connect } from 'react-redux';

const TextEditorCon = () => {
  return (
    <div>Your component JSX</div>
  );
};

const mapStateToProps = (state:any) => ({
  // Map your state data to props here
  data: state.data
});

export default connect(mapStateToProps)(TextEditorCon);
