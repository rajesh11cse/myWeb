import React from "react";
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function EditTextBar(props:any) {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      <Sidebar collapsed={props.collapsed} customBreakPoint="80px" collapsedWidth="1px" rtl>
        hello
       {/*  <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu> */}
      </Sidebar>
    
    </div>
  );
}

export default EditTextBar;
