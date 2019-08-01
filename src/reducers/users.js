import { combineReducers } from "redux"
import {
    LOGIN_USER,
  } from "../helpers/actionTypes";
  
  export const currentUser = (state = {}, action) => {
    switch (action.type) {
      case LOGIN_USER:
        return {... action.user};
      default:
        return state;
    }
  };

  export const allUsers = (state = [], action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  const users = combineReducers({
    allUsers,
    currentUser
  })
  
  export const getCurrentUser = state => state.currentUser
  
  export default users
  
  