import React from "react";
import { compose } from "ramda";
import { withState, withHandlers, lifecycle, withProps } from "recompose";
import { connect } from "react-redux";
import { postTask } from "../actions/tasks";
import Select from "react-select";
import { getAllUsers } from "../reducers"
import { allUsers } from "../actions/auth"

const TaskForm = ({
  setTitle,
  setDescription,
  formSubmission,
  setTaskToUpdate,
  title,
  description,
  availableMembers,
  setMembers,
  allUsers
}) => (
console.log(allUsers),
  <form className={"TaskForm"} onSubmit={formSubmission}>
    <button onClick={() => setTaskToUpdate(false)}>Close</button>
    <label>Title:</label>
    <input value={title} onChange={ev => setTitle(ev.target.value)} />

    <label>Description:</label>
    <input
      value={description}
      onChange={ev => setDescription(ev.target.value)}
    />

    <label>To share with:</label>
    <Select options={availableMembers} onChange={value => setMembers(value.value)} />

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
  withState("members", "setMembers", props => {
    return props.taskToUpdate.members || [];
  }),
  connect(
    state => ({
      allUsers: getAllUsers(state)
    }),
    dispatch => ({
      addNewTask: task => dispatch(postTask(task)),
      fetchAllUsers: () => dispatch(allUsers())
    })
  ),
  withProps(({members, allUsers})=>({
    availableMembers: allUsers.filter(user => !members.includes(user.email))
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.taskToUpdate != this.props.taskToUpdate) {
        this.props.setTitle(this.props.taskToUpdate.title || "");
        this.props.setDescription(this.props.taskToUpdate.description || "");
        this.props.setMembers(this.props.taskToUpdate.members || []);
      }
    },
    componentWillMount() {
        if (!this.props.currenUser) {
          this.props.fetchAllUsers();
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
