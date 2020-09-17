import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducers";
import messageReducer from "./reducers/messageReducer";
import userReducer from "./reducers/userReducer";
import userbaseReducer from "./reducers/userbaseReducer";

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  userbase: userbaseReducer,
  message: messageReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
