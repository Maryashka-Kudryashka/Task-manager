import { combineReducers } from "redux";
import {
  LOGIN_USER,
  LOGIN_USER_START,
  SIGNUP_USER,
  SIGNUP_USER_START,
  LOGIN_USER_FAILED
} from "../helpers/actionTypes";

export const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case SIGNUP_USER:
      return { ...action.user };
    case LOGIN_USER_FAILED:
      return { error: action.error };
    default:
      return state;
  }
};

export const fetching = (state = false, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
    case SIGNUP_USER_START:
      return true;
    case LOGIN_USER:
    case SIGNUP_USER:
    case LOGIN_USER_FAILED:
      return false;
    default:
      return state;
  }
};

const currentUser = combineReducers({
  user,
  fetching
});

export const getCurrentUser = state => state.user;
export const getUserFetching = state => state.fetching;

export default currentUser;
