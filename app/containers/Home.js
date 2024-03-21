import React from 'react';
import { connect } from 'react-redux';
import MyCarousel from '../components/MyCarousel';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <MyCarousel/>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(Home);