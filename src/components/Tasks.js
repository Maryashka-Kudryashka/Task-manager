import React from "react";
import "../styles/App.css";
import { compose } from "ramda"
import { lifecycle } from "recompose"
import { connect } from "react-redux"
import {fetchTasks } from "../actions/tasks"
import {logoutUser } from "../actions/auth"
import {getTasks } from "../reducers/index"
import { withState, withHandlers } from "recompose"

import Task from "./Task.js";
import TaskForm from "./TaskForm";

const Tasks = ({ tasks, taskToUpdate, setTaskToUpdate, logout }) => (
  <div className="App">
    <button onClick={() => logout()}>Log out</button>
    <button onClick={() => setTaskToUpdate({})}>Add new task</button>
    {taskToUpdate && <TaskForm setTaskToUpdate={setTaskToUpdate} taskToUpdate={taskToUpdate}/>}
    {tasks && tasks.map((task, i) => (
      <Task task={task} key={i} setTaskToUpdate={setTaskToUpdate} />
    ))}
  </div>
);

const enhancer = compose(
  withState("taskToUpdate", "setTaskToUpdate", false),
  connect(
    state => ({
      tasks: getTasks(state)
    }),
    dispatch => ({
      fetchAllTasks: () => dispatch(fetchTasks()),
      logout: () => logoutUser()
    })
  ),
  lifecycle({
    componentDidMount() {
        this.props.fetchAllTasks()
    }
  }),
)

export default enhancer(Tasks);
