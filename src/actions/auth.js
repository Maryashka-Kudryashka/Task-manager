import { push } from "react-router-redux";
import * as fromApi from "../api/auth";
import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  ALL_USERS,
  LOGIN_USER_START,
  SIGNUP_USER_START,
  LOGIN_USER_FAILED
} from "../helpers/actionTypes";

export const loginUserAction = user => ({
  type: LOGIN_USER,
  user
});

export const loginUserStart = () => ({
  type: LOGIN_USER_START
});

export const loginUserFailed = error => ({
  type: LOGIN_USER_FAILED,
  error
});

export const logoutUserAction = () => ({
  type: LOGOUT_USER
});

export const signUpUserAction = user => ({
  type: SIGNUP_USER,
  user
});

export const signUpUserStart = () => ({
  type: SIGNUP_USER_START
});

export const allUsersAction = users => ({
  type: ALL_USERS,
  users
});

export const loginUser = (email, password) => async dispatch => {
  let user = await fromApi.loginUser(email, password);
  if (user.user) {
    dispatch(loginUserAction(user.user));
    dispatch(push("/"));
  } else {
    dispatch(loginUserFailed(user));
  }
};

export const logoutUser = () => async dispatch => {
  fromApi.logoutUser();
  dispatch(logoutUserAction());
  dispatch(push("/login"));
};

export const fetchCurrentUser = () => async dispatch => {
  dispatch(loginUserStart());
  let user = await fromApi.getCurrentUser();
  dispatch(loginUserAction(user.user));
  dispatch(push("/"));
};

export const signUpUser = (email, password, name) => async dispatch => {
  dispatch(signUpUserStart());
  let user = await fromApi.signUpUser(email, password, name);
  dispatch(signUpUserAction(user.user));
  dispatch(push("/"));
};

export const allUsers = () => async dispatch => {
  let users = await fromApi.allUsers();
  dispatch(allUsersAction(users));
};
