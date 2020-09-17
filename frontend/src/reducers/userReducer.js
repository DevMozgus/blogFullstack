import loginService from "../services/login";
import blogService from "../services/blog";

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("loginUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: "LOGIN_USER",
      data: user,
    });
  };
};

export const returnUser = () => {
  return async (dispatch) => {
    const loginUserJSON = window.localStorage.getItem("loginUser");
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON);
      blogService.setToken(user.token);
      dispatch({
        type: "RETURN_USER",
        data: user,
      });
    }
  };
};

export const signoutUser = () => {
  return async (dispatch) => {
    await window.localStorage.clear();
    dispatch({
      type: "SIGNOUT_USER",
    });
  };
};

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.data;
    case "RETURN_USER":
      if (action.data) return action.data;
      else return null;
    case "SIGNOUT_USER":
      return null;
    case "GET_USERS":
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
