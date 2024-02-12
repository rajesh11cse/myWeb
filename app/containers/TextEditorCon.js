import React from 'react';
import { connect } from 'react-redux';
// import TextEditor from '../components/TextEditor';
import LeftSideBar from '../components/LeftSideBar';
import TextEditor2 from '../components/TextEditor2';
// import TextEditor3 from '../components/TextEditor3';


export class TextEditorCon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };
  }
  render() {
    return (
        <TextEditor2/>
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