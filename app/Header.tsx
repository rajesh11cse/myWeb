import React from 'react';
import { NavLink } from 'react-router-dom';

import {
    Navbar,
    Nav,
} from 'reactstrap';

import {
    Button,
    DropdownButton,
    Dropdown,
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
                            <NavLink to="/templates">
                                <Button variant="outline-secondary" >Templates</Button>
                            </NavLink>
                            <NavLink to="/editor">
                                <Button variant="outline-secondary" >Products</Button>
                                </NavLink>
                            <NavLink to="/support">
                                <Button variant="outline-secondary" >Support</Button>
                                </NavLink>
                            <NavLink to="/pricing">
                                <Button variant="outline-secondary" >Pricing</Button>
                            </NavLink>
                            <NavLink to="#">
                            <DropdownButton id="dropdown-basic-button" title="Rajesh" className='dropDown' variant="outline-secondary">
                                <Dropdown.Item href="#/action-1">Account</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Orders</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Setting</Dropdown.Item>
                            </DropdownButton>
                            </NavLink>
                        </Nav>
                </Navbar>


            </div>
        )
    }
}

export default Header;