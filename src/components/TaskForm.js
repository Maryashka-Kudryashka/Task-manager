import React from "react";
import { compose } from "ramda";
import { withState, withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { postTask } from "../actions/tasks";

const TaskForm = ({
  setTitle,
  setDescription,
  formSubmission,
  setTaskToUpdate,
  title,
  description
}) => (
  <form className={"TaskForm"} onSubmit={formSubmission}>
    <button onClick={() => setTaskToUpdate(false)}>Close</button>
    <label>Title:</label>
    <input value={title} onChange={ev => setTitle(ev.target.value)} />

    <label>Description:</label>
    <input
      value={description}
      onChange={ev => setDescription(ev.target.value)}
    />

    <button>Submit</button>
  </form>
);

const enhancer = compose(
  withState("title", "setTitle", props => {
    return props.taskToUpdate.title || "";
  }),
  withState("description", "setDescription", props => {
    return props.taskToUpdate.description || "";
  }),
  connect(
    null,
    dispatch => ({
      addNewTask: task => dispatch(postTask(task))
    })
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.taskToUpdate != this.props.taskToUpdate) {
        this.props.setTitle(this.props.taskToUpdate.title || "");
        this.props.setDescription(this.props.taskToUpdate.description || "");
      }
    }
  }),
  withHandlers({
    formSubmission: ({
      title,
      description,
      addNewTask,
      taskToUpdate
    }) => ev => {
      ev.preventDefault();
      if (title && description) {
        addNewTask({ ...taskToUpdate, title, description });
      }
    }
  })
);

export default enhancer(TaskForm);
