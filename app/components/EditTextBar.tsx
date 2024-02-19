import React from "react";
import WordEdit from "./WordEdit";
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function EditTextBar(props:any) {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar collapsed={props.collapsed} width="350px"customBreakPoint="80px" collapsedWidth="1px" rtl>
        Edit Now
        <WordEdit selectedObject={props.selectedObject} currentCanvas={props.currentCanvas}/>
      </Sidebar>
    </div>
  );
}

export default EditTextBar;
