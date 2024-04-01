import React, { useState, useRef, useEffect } from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Navbar, Nav } from "reactstrap";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./css/header.css";
import Image from "react-bootstrap/Image";
// SVG Icons
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faArrowRightToBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import userProfile from "./assets/images/rajesh.jpeg";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface Props extends RouteComponentProps {
  onNavClick?: (loc: any) => void;
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
        <Nav className="nav-first visible-desktop" navbar>
          <div className="nav-item">
            <NavLink to="/templates" onClick={handleClick}>
              <Button variant="outline-secondary">Templates</Button>
            </NavLink>
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
          <div className="nav-item pricing-items">
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
        </Nav>
        <Nav className="nav-second visible-desktop ml-auto" navbar>
            <div className="search-box mr-2">
              <input
                tabIndex={0}
                className="inline-search-input js-search-field-input"
                name="s"
                type="text"
                id="nav-search-input"
                aria-label="Search for inspiration"
                placeholder="Search for a template"
                autoComplete="off"
              ></input>
              <FontAwesomeIcon
              className="mr-2"
                aria-label="Search for inspiration"
                icon={faMagnifyingGlass as IconProp}
              />
            </div>
          <div className="login-container">
            <Button variant="outline-primary" className="mr-2">
              <FontAwesomeIcon icon={faArrowRightToBracket as IconProp} />
              {" Login"}
            </Button>
            {/* <Image src={userProfile} width={30} roundedCircle /> */}
          </div>
        </Nav>
        <div className="nav-item visible-small-devices">
          <Button variant="light" className="mr-2">
            <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
          </Button>
          <Button variant="outline-primary" className="mr-2">
            <FontAwesomeIcon icon={faArrowRightToBracket as IconProp} />
            {" Login"}
          </Button>
          <Button
            variant="outline-secondary"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon icon={faBars as IconProp} color="#919191" />
          </Button>
          <Dropdown.Menu
            show={showDropdown}
            className="dropDown"
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Dropdown.Item href="#/action-3">Help</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </div>
      </Navbar>
    </div>
  );
};

export default withRouter(Header);
