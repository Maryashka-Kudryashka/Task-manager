import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tasks, * as fromTasks from "./tasks";
import users, * as fromUsers from "./users";
import currentUser, * as fromCurrentUser from "./currentUser";

export const getTasks = state => fromTasks.getTasks(state.tasks);
export const getCurrentUser = state =>
  fromCurrentUser.getCurrentUser(state.currentUser);
export const getAllUsers = state => fromUsers.getAllUsers(state.users);
export const getUserFetching = state =>
  fromCurrentUser.getUserFetching(state.currentUser);

export default history =>
  combineReducers({
    router: connectRouter(history),
    tasks,
    users,
    currentUser
  });
