import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";
import { deleteTask } from "../actions/tasks";

const Task = ({ task, deleteTaskFunc, setTaskToUpdate }) => (
  <article>
    <h2>{task.title}</h2>
    <span>{task.description}</span>
    <button onClick={() => setTaskToUpdate(task)}>Edit</button>
    <button onClick={() => deleteTaskFunc(task._id)}>Delete</button>
  </article>
);

const enhancer = compose(
  connect(
    null,
    dispatch => ({
      deleteTaskFunc: id => dispatch(deleteTask(id))
    })
  )
);

export default enhancer(Task);
