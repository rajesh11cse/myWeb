import React from 'react';
import { connect } from 'react-redux';
// import MyCarousel from '../components/MyCarousel';
import {WebHome} from '../components/home/WebHome';

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
        {/* <MyCarousel/> */}
        <WebHome/>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(Home);