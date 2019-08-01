import { combineReducers } from "redux"
import {
    LOGIN_USER, ALL_USERS
  } from "../helpers/actionTypes";
  
  export const currentUser = (state = {}, action) => {
    switch (action.type) {
      case LOGIN_USER:
        console.log("reducer")
        return {... action.user};
      default:
        return state;
    }
  };

  export const allUsers = (state = [], action) => {
    switch (action.type) {
    case ALL_USERS:
        return [...action.users]
      default:
        return state;
    }
  };
  
  const users = combineReducers({
    allUsers,
    currentUser
  })
  
  export const getCurrentUser = state => state.currentUser
  export const getAllUsers = state => state.allUsers
  
  export default users
  
  