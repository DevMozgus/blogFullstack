import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { initBlogs } from "./reducers/blogReducers";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
import Signup from "./components/Signup"
import Info from "./components/Info"
import Menu from "./components/Menu"
import BurgerMenu from "./components/BurgerMenu"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { returnUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/userbaseReducer";

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
        <div id="line" />

          <BurgerMenu />
          <Menu />

        <section className="content">
          <Switch>
            <Route path="/blogs/create">
              <BlogForm />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
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
              <Info />
            </Route>
          </Switch>
        </section>
      </Router>
    </>
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



export default App;
