import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withHandlers, withState } from "recompose";
import { Form, Button, Alert } from "react-bootstrap";

import "../styles/Login.css";
import { loginUser } from "../actions/auth";
import { getCurrentUser } from "../reducers";

const Login = ({
  formSubmission,
  email,
  password,
  setEmail,
  setPassword,
  currentUser
}) => (
  <Form onSubmit={formSubmission} className={"Login"}>
    <h2>Login</h2>
    <Form.Group className={"group"} controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        alue={email}
        onChange={ev => setEmail(ev.target.value)}
      />
    </Form.Group>

    <Form.Group className={"group"} controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
    </Form.Group>

    {currentUser.error && <Alert variant={"danger"}>{currentUser.error}</Alert>}
    <Button variant="info" type="submit">
      Submit
    </Button>
    <Link className={"signup"} to={`/register`}>
      Sign up
    </Link>
  </Form>
);

const enhancer = compose(
  withState("email", "setEmail", ""),
  withState("password", "setPassword", ""),
  connect(
    state => ({
      currentUser: getCurrentUser(state)
    }),
    dispatch => ({
      login: (email, password) => dispatch(loginUser(email, password))
    })
  ),
  withHandlers({
    formSubmission: ({ email, password, login }) => ev => {
      ev.preventDefault();
      if (email && password) {
        login(email, password);
      }
    }
  })
);

export default enhancer(Login);
