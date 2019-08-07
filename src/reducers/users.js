import { ALL_USERS } from "../helpers/actionTypes";

export const users = (state = [], action) => {
  switch (action.type) {
    case ALL_USERS:
      return [...action.users];
    default:
      return state;
  }
};

export const getAllUsers = state => state;

export default users;
