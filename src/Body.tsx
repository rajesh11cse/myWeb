import React from 'react';
import './BodyCss.css'; // Assume you have a CSS file for styling
import TextEditor from './TextEditor';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function Body() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className="app">
      <div className="sidebar">
        {/* Sidebar content */}
        <Sidebar collapsed={collapsed}>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
        <main style={{ padding: 10 }}>
        <div>
          <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
            Collapse
          </button>
        </div>
      </main>
      </div>
       {/* <div className="main-content"> */}
       {/* Main content */}
      {/* </div> */}
        <TextEditor/>
      <div className="sidebar">
        {/* Another sidebar content */}
      </div>
    </div>
  );
}

export default Body;
