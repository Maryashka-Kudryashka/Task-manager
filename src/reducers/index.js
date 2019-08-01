import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import tasks, * as fromTasks from "./tasks"
import users, * as fromUsers from "./users"

export const getTasks = state => fromTasks.getTasks(state.tasks)
export const getCurrentUser = state => fromUsers.getCurrentUser(state.users)
export const getAllUsers = state => fromUsers.getAllUsers(state.users)

export default history =>
  combineReducers({
    router: connectRouter(history),
    tasks,
    users
  })