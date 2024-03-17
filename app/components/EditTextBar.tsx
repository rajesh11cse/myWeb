import React from "react";
import WordEdit from "./WordEdit";
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {HeaderClose} from "./HeaderClose";
function EditTextBar(props:any) {
  return (
    <div style={{ display: 'flex', minHeight: '400px'}}>
      <Sidebar collapsed={props.collapsed} width="355px"customBreakPoint="80px" collapsedWidth="1px" rtl className="sideBarCustom">
        <HeaderClose text="Text Editing" showClose/>
        <WordEdit selectedObject={props.selectedObject} currentCanvas={props.currentCanvas}/>
      </Sidebar>
    </div>
  );
}

export default EditTextBar;


{/* <div className="container-a" id="container">
  <div className="header-a" id="header">Header</div>
  <div className="content-a">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.</p>
  </div>
</div> */}