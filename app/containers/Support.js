import React from 'react';
import { connect } from 'react-redux';
export class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <div>Support</div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(Support);