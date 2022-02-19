import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";



import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
  } from "./reducers/userReducer";
  
  const reducer = combineReducers({
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotpassword:forgotPasswordReducer
  });
  const middleware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;