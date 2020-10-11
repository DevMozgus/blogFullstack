import React from "react";
import { getAllUsers } from "../reducers/userbaseReducer";
import signupService from "../services/signup"
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/messageReducer";
import { useField } from "../hooks";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username] = useField("text");
  const [name] = useField("text");
  const [password] = useField("password");

  const history = useHistory();
  const dispatch = useDispatch();
  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username: username.value,
        name: name.value,
        password: password.value,
      };
      await signupService.signup(user)
      await dispatch(getAllUsers());
      const success = {
        success: "Successful Login",
      };
      dispatch(newNotification(success));
      history.push("/blogs");
    } catch (err) {
      const error = {
        error: "Login Failed",
        err: err,
      };
      dispatch(newNotification(error));
    }
  };

  return (
    <>
      <form className="loginform" onSubmit={handleSignup}>
        <div className="formelement">
          <label>Username</label>
          <br />
          <input
            placeholder="Enter Username"
            {...username}
            id="username"
            name="Username"
          />
        </div>
        <div className="formelement">
          <label>Name</label>
          <br />
          <input
            placeholder="Enter Name"
            {...name}
            id="name"
            name="name"
          />
        </div>
        <div className="formelement">
          <label>Password</label>
          <br />

          <input
            placeholder="Enter Password"
            id="password"
            name="Password"
            {...password}
          />
        </div>
        <button className="importantButton" type="submit">
          Sign up
        </button>
      </form>
    </>
  );
};



export default Login;
