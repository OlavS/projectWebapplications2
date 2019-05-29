import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SearchField from './SearchField';

/**
 * Contains a navbar. Linking the user to features in the application.
 * @param {any} props a call to the parents setSearch ie. in App.jsx.
 */
export default function Header(props) {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">
                        Holbergs film
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="/">
                    Ofte stilte spørsmål
                </NavItem>
                <NavItem eventKey={2} href="/Admin">
                    Administrator
                </NavItem>
            </Nav>
            <Navbar.Form>
                <SearchField setSearch={(searchString) => props.setSearch(searchString)} />
            </Navbar.Form>
        </Navbar>
    );
}