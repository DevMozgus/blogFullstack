import React from "react";
import { loginUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/messageReducer";
import { useField } from "../hooks";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, resetUsername] = useField("text");
  const [password, resetPassword] = useField("password");

  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username: username.value,
        password: password.value,
      };
      dispatch(loginUser(user));

      resetPassword();
      resetUsername();
      const success = {
        success: "Successful Login",
      };
      dispatch(newNotification(success));
      history.push("/");
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
      <Form onSubmit={handleLogin}>
        <Input>
          <label>Username</label>
          <br />
          <input
            placeholder="Enter Username"
            {...username}
            id="username"
            name="Username"
          />
        </Input>
        <Input>
          <label>Password</label>
          <br />

          <input
            placeholder="Enter Password"
            id="password"
            name="Password"
            {...password}
          />
        </Input>
        <button className="importantButton" type="submit">
          continue
        </button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 5%;
  height: 100%;
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1%;
  align-items: flex-start;
  justify-content: space-between;

  label {
    color: white;
    margin-bottom: 2px;
  }
`;

export default Login;
