import React, {useState, useRef} from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./css/header.css";

// SVG Icons
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


  export const Header: React.FC = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Adjust the delay time as needed
  };

  const handleMenuMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
      <div id="header-container">
        <Navbar color="light" light expand="md" className="navbar-container">
          {/* <NavbarBrand ><NavLink to="/">Home</NavLink></NavbarBrand> */}
          <NavLink to="/">RV Docs</NavLink>
          {/* close mark ends */}
          <Nav className="ml-auto" navbar>
            <div className="nav-item">
              <NavLink to="/templates">
                <Button variant="outline-secondary">Templates</Button>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/editor">
                <Button variant="outline-secondary">Products</Button>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/support">
                <Button variant="outline-secondary">Support</Button>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/pricing">
                <Button variant="outline-secondary"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >Pricing <FontAwesomeIcon icon={faAngleDown as IconProp} size="sm" color="#919191"/>
                </Button>
              </NavLink>
              <Dropdown.Menu show={showDropdown} className="dropDown" onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Dropdown.Item href="#/action-1">Profile Data</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Help</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </div>
            <div style={{borderRight: '1px solid #ccc'}}/>
            <div className="login-container">
                <Button variant="outline-primary">Login</Button>
            </div>
        </Navbar>
      </div>
    );
}