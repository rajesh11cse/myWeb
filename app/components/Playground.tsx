import React, {useState, useEffect} from 'react';
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses, MenuItemStyles } from "react-pro-sidebar";
import { SidebarHeader } from './SidebarHeader';
import { Diamond } from './icons/Diamond';
import { BarChart } from './icons/BarChart';
import { Global } from './icons/Global';
import { Calendar } from './icons/Calendar';
import { ShoppingCart } from './icons/ShoppingCart';
import { SidebarFooter } from './SidebarFooter';
import { Typography } from './Typography';
import "../css/LeftSideBar.css"; // Assume you have a CSS file for styling
import { ShowPanel } from "../css/styled";

import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  FloatingLabel,
  InputGroup,
  Form,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { HttpLink } from "../assets/icons/HttpLink";
import {HeaderClose} from "./HeaderClose";


// SVG Icons
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';



const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  }
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface MyComponentProps {
  makeObject: (type:string) => void;
  uploadImage: (type:string) => void;
  isCollapsed: (type:boolean) => void;
}

export const Playground: React.FC<MyComponentProps> = ({ makeObject, isCollapsed, uploadImage }) => {
  const rtl = false
  const hasImage = false
  const theme = 'light'

  const [imageLink, setImageLink] = useState("");
  const [collapsed, setCollapsed] = useState(false);


  
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };



  
  const handleImageLinkChange = (e: any) => {
    setImageLink(e.target.value);
  };

  const closeHeader = () => {
    setCollapsed(true)
  };
  const openHeader = () => {
    setCollapsed(false)
  };

  useEffect(() => {
    isCollapsed(collapsed)

  }, [collapsed])


  return (
    <div style={{ display: 'contents', height: '100%', direction: 'ltr' }}>
      <Sidebar
        collapsedWidth="1px"
        collapsed={collapsed}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
        rootStyles={{
          color: themes[theme].sidebar.color
        }}
      >
        {/* <FontAwesomeIcon icon={faArrowRight as faAngleUp}  onClick={openHeader}/> */}
        <HeaderClose text="Text Elements" showClose clickClose={closeHeader}/>

        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SidebarHeader rtl={rtl} style={{ marginBottom: '24px', marginTop: '16px' }} />
          <div style={{ flex: 1, marginBottom: '32px' }}>
          <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                Text Elements
              </Typography>
            </div>
            <Menu menuItemStyles={menuItemStyles} className='side_bar_left_custom' rootStyles={{
          [`.${menuClasses.icon}`]: {
            backgroundColor: '#e1e1e1',
            color: '#344cff',
          },
        }}>
            <MenuItem icon={<BarChart />} onClick={()=>makeObject("header")}> Title </MenuItem>
            <MenuItem icon={<Global />} onClick={()=>makeObject("text")}> Text </MenuItem>
            <MenuItem icon={<Diamond />} onClick={()=>makeObject("line")}> Line </MenuItem>
            <MenuItem icon={<ShoppingCart />} onClick={()=>makeObject("table")}> Table </MenuItem>
              <SubMenu label="Image" icon={<Calendar />}>
                {/* <MenuItem style={{height:'100%'}}>  */}
                <div  className="image-container">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="https://"
                    aria-label="Color code"
                    aria-describedby="basic-addon2"
                    onChange={handleImageLinkChange}
                    size='sm'
                  />
                </InputGroup>
                <Button variant="primary" disabled={!imageLink} onClick={() => uploadImage(imageLink)}> Submit </Button>

                <span className="formbold-or"> Or </span>

                  <div className="formbold-file-input">
                    {/* <input type="file" name="file" id="file" /> */}
                        <span className="formbold-drop-file"> Drop files here </span>
                        <span className="formbold-browse"> Browse </span>
                      </div>
                </div>
                 {/* </MenuItem> */}
              </SubMenu>
              <MenuItem icon={<Diamond />} onClick={()=>makeObject("signature")}> Signature </MenuItem>
            <MenuItem icon={<BarChart />} onClick={()=>makeObject("rect")}> Box </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
      {collapsed && <ShowPanel className='slide-from-left'>
        <Button variant="secondary" onClick={openHeader}>
          <FontAwesomeIcon icon={faArrowRight as faAngleUp}  onClick={openHeader} title="open elements"/>
        </Button>
      </ShowPanel>}
    </div>
  );
};