import React from 'react';
import { connect } from 'react-redux';
export class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <div>Pricing</div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(Pricing);