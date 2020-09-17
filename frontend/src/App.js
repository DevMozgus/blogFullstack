import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { initBlogs } from "./reducers/blogReducers";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
import "./App.css";
import { signoutUser, returnUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/userbaseReducer";

import styled from "styled-components";
import BlogForm from "./components/BlogForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(returnUser());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Line id="line" />
        <Menu />
        <Body>
          <Switch>
            <Route path="/blogs/create">
              <BlogForm />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/blogs">
              <Blogs />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </Body>
      </Router>
    </>
  );
};

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signoutUser());
  };

  return (
    <Top>
      <Title>Blog App</Title>
      <Navbar>
        <Link className="link" to="/blogs">
          blogs
        </Link>
        <Link className="link" to="/users">
          users
        </Link>
        {user ? (
          <>
            <button onClick={handleSignout}>logout</button>
          </>
        ) : (
          <Link id="login" className="link" to="/login">
            login
          </Link>
        )}
      </Navbar>
    </Top>
  );
};

const Message = () => {
  const message = useSelector((state) => state.message);
  if (!message) return null;

  return (
    <>
      <div>
        <p>{message.success || message.error}</p>
      </div>
    </>
  );
};

const Title = styled.h1`
  margin-left: 25%;
  font-size: 1.5em;
  color: rgba(255, 255, 255, 0.9);
`;

const Navbar = styled.div`
  margin-right: 25%;
  flex-basis: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  margin-left: 25%;
  margin-right: 25%;
  font-family: "Roboto", sans-serif;
`;

const Top = styled.div`
  color: rgba(250, 250, 250, 80%);
  background-color: #16213e;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2em;
  font-family: "Syne", sans-serif;
`;

const Line = styled.div`
  background-color: #0f3460;
  height: 0.3em;
  width: 100%;
`;

export default App;
