import userService from "../services/user";

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
  };
};

const userbaseReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;
    default:
      return state;
  }
};

export default userbaseReducer;
