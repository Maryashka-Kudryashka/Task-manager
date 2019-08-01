import {
  FETCH_TASKS,
  POST_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from "../helpers/actionTypes";

export const tasks = (state = [], action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return [...action.tasks];
    case POST_TASK:
      return [...state, action.task];
    case DELETE_TASK:
      return state.filter(el => el._id !== action.task._id);
    case UPDATE_TASK:
      return state.map(task => {
        if (task._id === action.task._id) {
          return { ...action.task };
        } else {
          return task;
        }
      });
    default:
      return state;
  }
};

export const getTasks = state => state;

export default tasks;
