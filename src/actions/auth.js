import * as fromApi from "../api/auth";
import { LOGIN_USER, LOGOUT_USER } from "../helpers/actionTypes";
import { push } from "react-router-redux";

export const loginUserAction = user => ({
  type: LOGIN_USER,
  user
});

export const logoutUserAction = () => ({
  type: LOGOUT_USER
});

export const loginUser = (email, password) => async dispatch => {
  let user = await fromApi.loginUser(email, password);
  dispatch(loginUserAction(user));
  dispatch(push("/"));
};

export const logoutUser = () => async dispatch => {
  let user = await fromApi.logoutUser();
  dispatch(loginUserAction());
};
