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
                <Navbar color="light" light expand="md" class="navbar-container">
                    <NavbarBrand ><NavLink to="/">Home</NavLink></NavbarBrand>
                    <NavbarToggler  onClick={this.toggle} >
                    {/* Close mark */}
                    <div id="close-icon" className={this.state.isOpen ? "open" : "" }>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {/* close mark ends */}
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/" onClick={this.toggle}>Templates</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" onClick={this.toggle}>Products</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" onClick={this.toggle}>Support</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/" onClick={this.toggle}>Pricing</NavLink>
                                {/* <NavLink to="/users" onClick={this.toggle}>Pricing</NavLink> */}
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>


            </div>
        )
    }
}

export default Header;