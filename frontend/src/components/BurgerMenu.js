import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signoutUser } from "../reducers/userReducer";

const BurgerMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signoutUser());
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <section id="burgerMenu">
    <Navbar color="faded" dark>
    <NavbarBrand className="mr-auto">Blog App</NavbarBrand>
    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
            <Link className="link" to="/blogs">
              blogs
            </Link>
            </NavItem>
            <NavItem>
            <Link className="link" to="/users">
              users
            </Link>            
            </NavItem>
            {user ? (
              <>
              <NavItem>
                <button onClick={handleSignout}>logout</button>
              </NavItem>
              </>
            ) : (
              <>
              <NavItem>
              <Link id="login" className="link" to="/login">
                login
              </Link>
              </NavItem>
              <NavItem>
              <Link id="signup" className="link" to="/signup">
                sign up
              </Link>
              </NavItem>
              </>
            )}              
          </Nav>
    </Collapse>
    </Navbar>
    </section>
  )
}

export default BurgerMenu