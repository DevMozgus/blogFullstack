import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";  
import { signoutUser } from "../reducers/userReducer";

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signoutUser());
  };

  return (
    <section id="defaultMenu">
    <Navbar color="faded" dark>
      <NavbarBrand className="mr-auto">Blog App</NavbarBrand>
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
    </Navbar>
    </section>
  );
};

export default Menu