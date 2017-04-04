
import React from 'react';
import {Link} from 'react-router';
import { Nav, NavItem, Navbar, MenuItem, NavDropdown} from 'react-bootstrap';

export default class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar className="navigation__navbar">
                    <Navbar.Header className="navigation__nav-header">
                        <Navbar.Brand className="navigation__nav-brand">
                            <a href="#">Weather App</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav className="navigation__nav">
                        <NavItem className="navigation__nav-item" eventKey={1}>
                            <Link to="/" className="navigation__link" activeClassName="active">Get Weather</Link>
                        </NavItem>

                        <NavItem className="navigation__nav-item" eventKey={2}>
                            <Link to="/about" className="navigation__link" activeClassName="active">About</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
