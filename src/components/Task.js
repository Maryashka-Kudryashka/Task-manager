import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";
import { Button, Card } from "react-bootstrap";

import "../styles/Task.css";
import { deleteTask } from "../actions/tasks";

const Task = ({ task, deleteTaskFunc, setTaskToUpdate }) => (
  <Card style={{ width: "18rem" }} className={"Task"}>
    <Card.Body>
      <Card.Title>{task.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Author: {task.author}
      </Card.Subtitle>
      {task.members && (
        <Card.Subtitle className="mb-2 text-muted">
          Members:{" "}
          {task.members.map((member, i) => (
            <span className={"member"} key={i}>
              {" "}
              {member}
            </span>
          ))}
        </Card.Subtitle>
      )}
      <Card.Text>{task.description}</Card.Text>
      <Button
        className={"edit"}
        variant="info"
        onClick={() => setTaskToUpdate(task)}
      >
        Edit
      </Button>
      <Button variant="danger" onClick={() => deleteTaskFunc(task._id)}>
        Delete
      </Button>
    </Card.Body>
  </Card>
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
