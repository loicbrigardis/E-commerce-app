import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBIcon, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

import { signout, isAuthentificated } from '../auth';
import { itemTotal } from './cartHelpers';

const isActive = (history, to) => {
    if (history.location.pathname === to) {
        return true;
    } else {
        return false;
    }
}

const Menu = ({ history }) => {
    const [collapse, setCollapse] = useState(false);

    const bgColor = { backgroundColor: '#315C8A' }
    return (
        <div>
            <header>
                <MDBNavbar style={bgColor} dark expand="md" scrolling fixed="top">
                    <MDBNavbarBrand href="/">
                        <strong>E-commerce</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={() => setCollapse(!collapse)} />
                    <MDBCollapse navbar isOpen={collapse}>
                        <MDBNavbarNav left>
                            <MDBNavItem active={isActive(history, '/')} >
                                <MDBNavLink to="/">Home</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="ml-2" active={isActive(history, '/shop')} >
                                <MDBNavLink to="/shop">Shop</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="ml-2" active={isActive(history, '/cart')} >
                                <MDBNavLink to="/cart">
                                    <i className="fas fa-shopping-cart"></i>
                                    Cart
                                    <span className="badge badge-success ml-2">{itemTotal()}</span>
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            {!isAuthentificated() && (
                                <>
                                    <MDBNavItem active={isActive(history, '/signin')}>
                                        <MDBNavLink to="/signin">Signin</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem active={isActive(history, '/signup')}>
                                        <MDBNavLink to="/signup">Signup</MDBNavLink>
                                    </MDBNavItem>
                                </>
                            )}
                            {isAuthentificated() && isAuthentificated().user.role === 0 && (
                                <MDBNavItem active={isActive(history, '/user/dashboard')}>
                                    <MDBNavLink to="/user/dashboard">Dashboard</MDBNavLink>
                                </MDBNavItem>
                            )}
                            {isAuthentificated() && isAuthentificated().user.role === 1 && (

                                <MDBNavItem active={isActive(history, '/admin/dashboard')}>
                                    <MDBNavLink to="/admin/dashboard">Admin Dashboard</MDBNavLink>
                                </MDBNavItem>

                            )}
                            {isAuthentificated() && (
                                <>

                                    <MDBNavItem>
                                        <MDBDropdown>
                                            <MDBDropdownToggle nav caret>
                                                <MDBIcon icon="user" />
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu basic color="info">
                                                <MDBDropdownItem onClick={() => signout(() => { history.push("/") })}>
                                                    Signout
                                        </MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBNavItem>
                                </>
                            )}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </header>
        </div>
    );
}

export default withRouter(Menu);