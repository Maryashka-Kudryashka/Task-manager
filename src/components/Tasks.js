import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";
import { lifecycle, withState } from "recompose";
import { Container, Row, Col, Button } from "react-bootstrap";

import "../styles/Tasks.css";
import Task from "./Task.js";
import TaskForm from "./TaskForm";
import { logoutUser } from "../actions/auth";
import { fetchTasks } from "../actions/tasks";
import { getTasks, getCurrentUser } from "../reducers/index";

const Tasks = ({ tasks, taskToUpdate, setTaskToUpdate }) => (
  <div className="Tasks">
    <Button
      variant="info"
      className={"add-button"}
      onClick={() => setTaskToUpdate({})}
    >
      Add new task
    </Button>
    <Container>
      <Row>
        {taskToUpdate && (
          <Col md={4}>
            <TaskForm
              setTaskToUpdate={setTaskToUpdate}
              taskToUpdate={taskToUpdate}
            />
          </Col>
        )}
        {tasks &&
          tasks.map((task, i) => (
            <Col md={4} key={i}>
              <Task task={task} setTaskToUpdate={setTaskToUpdate} />
            </Col>
          ))}
      </Row>
    </Container>
  </div>
);

const enhancer = compose(
  withState("taskToUpdate", "setTaskToUpdate", false),
  connect(
    state => ({
      tasks: getTasks(state),
      currentUser: getCurrentUser(state)
    }),
    dispatch => ({
      fetchUserTasks: email => dispatch(fetchTasks(email)),
      logout: () => logoutUser()
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchUserTasks(this.props.currentUser.email);
    }
  })
);

export default enhancer(Tasks);
