import * as fromApi from "../api/auth";
import { LOGIN_USER, LOGOUT_USER, SIGNUP_USER, ALL_USERS } from "../helpers/actionTypes";
import { push } from "react-router-redux";

export const loginUserAction = user => ({
  type: LOGIN_USER,
  user
});

export const logoutUserAction = () => ({
  type: LOGOUT_USER
});

export const signUpUserAction = () => ({
    type: SIGNUP_USER
  });

  export const allUsersAction = users => ({
    type: ALL_USERS,
    users
  });

export const loginUser = (email, password) => async dispatch => {
  let user = await fromApi.loginUser(email, password);
  dispatch(loginUserAction(user));
  dispatch(push("/"));
};

export const logoutUser = () => async dispatch => {
  let user = await fromApi.logoutUser();
  dispatch(logoutUserAction());
};

export const fetchCurrentUser = () => async dispatch => {
  let user = await fromApi.getCurrentUser();
//   dispatch(loginUserAction(user));
};

export const signUpUser = (email, password, name) => async dispatch => {
    let user = await fromApi.signUpUser(email, password, name);
    dispatch(signUpUserAction(user));
    // dispatch(push("/"));
  };

export const allUsers = () => async dispatch => {
    console.log("all")
    let users = await fromApi.allUsers();
    dispatch(allUsersAction(users));
}