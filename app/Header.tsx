import React from 'react';
import { NavLink } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import {
    Nav
    Button,
    NavItem,
    Navbar
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

import './css/header.css';

class Header extends React.Component<any, any>{

    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div id="header-container">
                <Navbar color="light" light expand="md" className="navbar-container">
                    {/* <NavbarBrand ><NavLink to="/">Home</NavLink></NavbarBrand> */}
                    <NavLink to="/">RV Docs</NavLink>
                    {/* close mark ends */}
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button variant="outline-secondary" >Templates</Button>
                            </NavItem>
                            <NavItem>
                                <Button variant="outline-secondary" >Products</Button>
                            </NavItem>
                            <NavItem>
                                <Button variant="outline-secondary" >Support</Button>

                            </NavItem>
                            <NavItem>
                                <Button variant="outline-secondary" >Pricing</Button>
                            </NavItem>
                            <NavItem>
                            <DropdownButton id="dropdown-basic-button" title="Rajesh" className='dropDown' variant="outline-secondary">
                                <Dropdown.Item href="#/action-1">Account</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Orders</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Setting</Dropdown.Item>
                            </DropdownButton>
                            </NavItem>
                        </Nav>
                </Navbar>


            </div>
        )
    }
}

export default Header;