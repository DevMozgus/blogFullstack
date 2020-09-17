export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification,
    });
  };
};

export const newNotification = (notification, seconds = 3) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(setNotification(null)), seconds * 1000);
  };
};

const messageReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default messageReducer;
