import React from 'react';
import { connect } from 'react-redux';
// import TextEditor from '../components/TextEditor';
import LeftSideBar from '../components/LeftSideBar';
// import TextEditor2 from '../components/TextEditor2';
 import TextEditor4 from '../components/TextEditor4';




export class TextEditorCon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }
  render() {
    return (
      <TextEditor4/>
    );
  }
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps)(TextEditorCon);


// render() {
//   return (
//     // <div className="app">
//       {/* <LeftSideBar/> */}
//       <TextEditor2/>
//       {/* <TextEditor/> */}
//   //  </div>
//   );
// }
// };