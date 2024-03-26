import React, { useState, useRef, useEffect } from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./css/header.css";
import Image from 'react-bootstrap/Image';
// SVG Icons
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import userProfile from "./assets/images/rajesh.jpeg";

interface Props extends RouteComponentProps {
  onNavClick?: (loc:any) => void;
}

const Header: React.FC<Props> = ({ history, onNavClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return history.listen(() => {
      // Reset dropdown state on navigation
      setShowDropdown(false);
    });
  }, [history]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // Adjust the delay time as needed
  };

  const handleMenuMouseEnter = () => {
    clearTimeout(timeoutRef.current!);
  };

  const handleClick = () => {
    if (onNavClick) {
      timeoutRef.current = setTimeout(() => {
        onNavClick(history.location.pathname);
      }, 100); // Adjust delay time as needed
    }
  };

  return (
    <div id="header-container">
      <Navbar color="light" light expand="md" className="navbar-container">
        <NavLink to="/">RV Docs</NavLink>
        <Nav className="ml-auto" navbar>
          <div className="nav-item">
            <NavLink to="/templates" onClick={handleClick}>
              <Button variant="outline-secondary">Templates</Button>
            </NavLink>
            {/* <div className="headerItemHover"/> */}
          </div>
          <div className="nav-item">
            <NavLink to="/editor" onClick={handleClick}>
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
              <Button
                variant="outline-secondary"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Pricing{" "}
                <FontAwesomeIcon
                  icon={faAngleDown as IconProp}
                  size="sm"
                  color="#919191"
                />
              </Button>
              <Dropdown.Menu
                show={showDropdown}
                className="dropDown"
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Dropdown.Item href="#/action-1">Profile Data</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Help</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </NavLink>
          </div>
          <div style={{ borderRight: "1px solid #ccc" }} />
          <div className="login-container">
            <Button variant="outline-primary">Login</Button>
            <Image src={userProfile} width={30} roundedCircle />
          </div>
        </Nav>
      </Navbar>
    </div>
  );
};

export default withRouter(Header);
