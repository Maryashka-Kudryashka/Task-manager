import React from "react";
import { compose } from "ramda";
import Select from "react-select";
import { connect } from "react-redux";
import { Form, Button, Alert } from "react-bootstrap";
import { withState, withHandlers, lifecycle, withProps } from "recompose";

import "../styles/TaskForm.css";
import { allUsers } from "../actions/auth";
import { postTask } from "../actions/tasks";
import { getAllUsers, getCurrentUser } from "../reducers";

const TaskForm = ({
  setTitle,
  setDescription,
  formSubmission,
  setTaskToUpdate,
  title,
  description,
  availableMembers,
  setMembers,
  members,
  formError
}) => (
  <Form onSubmit={formSubmission} className="TaskForm">
    <Form.Group controlId="exampleForm.ControlTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        type="text"
        placeholder="Best task"
      />
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control
        value={description}
        onChange={ev => setDescription(ev.target.value)}
        as="textarea"
        rows="3"
        placeholder="To make everything pink..."
      />
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlMembers">
      <Form.Label>To share with:</Form.Label>
      <Select
        isMulti={true}
        options={availableMembers}
        defaultValue={members}
        onChange={value => setMembers(value)}
      />
    </Form.Group>
    {formError && <Alert variant={"danger"}>{formError}</Alert>}
    <Button className={"submit"} variant="info" type={"submit"}>
      Submit
    </Button>
    <Button variant="secondary" onClick={() => setTaskToUpdate(false)}>
      Close
    </Button>
  </Form>
);

const enhancer = compose(
  withState("formError", "setFormError"),
  withState("title", "setTitle", props => {
    return props.taskToUpdate.title || "";
  }),
  withState("description", "setDescription", props => {
    return props.taskToUpdate.description || "";
  }),
  withState("members", "setMembers", props => {
    if (props.taskToUpdate._id) {
      return props.taskToUpdate.members.map(member => ({
        value: member,
        label: member
      }));
    } else {
      return [];
    }
  }),
  connect(
    state => ({
      allUsers: getAllUsers(state),
      currentUser: getCurrentUser(state)
    }),
    dispatch => ({
      addNewTask: task => dispatch(postTask(task)),
      fetchAllUsers: () => dispatch(allUsers())
    })
  ),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.taskToUpdate !== this.props.taskToUpdate) {
        this.props.setTitle(this.props.taskToUpdate.title || "");
        this.props.setDescription(this.props.taskToUpdate.description || "");
        this.props.setMembers(this.props.taskToUpdate.members || []);
      }
    },
    componentWillMount() {
      if (this.props.allUsers.length == 0) {
        this.props.fetchAllUsers();
      }
    }
  }),
  withProps(({ members, allUsers, currentUser, taskToUpdate }) => {
    const users = members
      ? allUsers.filter(user => !members.includes(user.email))
      : allUsers;
    return {
      availableMembers: users
        .filter(
          user =>
            user._id !== currentUser._id && user.email !== taskToUpdate.author
        )
        .map(user => ({
          value: user.email,
          label: user.email
        }))
    };
  }),
  withHandlers({
    formSubmission: ({
      title,
      description,
      addNewTask,
      members,
      currentUser,
      taskToUpdate,
      setTaskToUpdate,
      setFormError
    }) => ev => {
      ev.preventDefault();
      const taskMembers = members && members.map(member => member.value);
      if (title && description) {
        addNewTask({
          ...taskToUpdate,
          title,
          description,
          members: taskMembers,
          author: taskToUpdate._id ? taskToUpdate.author : currentUser.email
        });
        setTaskToUpdate(false);
      } else {
        setFormError("Please, fill title and description")
      }
    }
  })
);

export default enhancer(TaskForm);
