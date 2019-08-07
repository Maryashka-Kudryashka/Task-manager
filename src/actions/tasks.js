import * as fromApi from "../api/tasks";
import {
  FETCH_TASKS,
  POST_TASK,
  DELETE_TASK,
  UPDATE_TASK
} from "../helpers/actionTypes";

export const fetchTasksAction = tasks => ({
  type: FETCH_TASKS,
  tasks
});

export const addTaskAction = task => ({
  type: POST_TASK,
  task
});

export const updateTaskAction = task => ({
  type: UPDATE_TASK,
  task
});

export const deleteTaskAction = task => ({
  type: DELETE_TASK,
  task
});

export const fetchTasks = email => async dispatch => {
  let tasks = await fromApi.getTasks(email);
  dispatch(fetchTasksAction(tasks));
};

export const postTask = task => async dispatch => {
  let postedTask = await fromApi.postTask(task);
  dispatch(task._id ? updateTaskAction(postedTask) : addTaskAction(postedTask));
};

export const deleteTask = id => async dispatch => {
  let deletedTask = await fromApi.deleteTask(id);
  dispatch(deleteTaskAction(deletedTask));
};
