import React from "react";
import { compose } from "ramda";
import { lifecycle } from "recompose";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withHandlers, withState } from "recompose";
import { Form, Button, Alert } from "react-bootstrap";

import "../styles/Signup.css";
import { getAllUsers } from "../reducers";
import { signUpUser, allUsers } from "../actions/auth";

const RegisterForm = ({
  formSubmission,
  email,
  password,
  passwordR,
  setPasswordR,
  setEmail,
  setPassword,
  formError
}) => (
  <Form onSubmit={formSubmission} className={"Signup"}>
    <h2>Sign up</h2>
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

    <Form.Group className={"group"} controlId="formBasicPassword">
      <Form.Label>Repeat password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={passwordR}
        onChange={ev => setPasswordR(ev.target.value)}
      />
    </Form.Group>
    {formError && <Alert variant={"danger"}>{formError}</Alert>}
    <Button variant="info" type="submit">
      Submit
    </Button>
    <Link className={"login"} to={`/login`}>
      Login
    </Link>
  </Form>
);

const enhancer = compose(
  withState("email", "setEmail", ""),
  withState("password", "setPassword", ""),
  withState("passwordR", "setPasswordR", ""),
  withState("formError", "setFormError"),
  connect(
    state => ({
      allUsers: getAllUsers(state)
    }),
    dispatch => ({
      signUp: (email, password, name) =>
        dispatch(signUpUser(email, password, name)),
      fetchAllUsers: () => dispatch(allUsers())
    })
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.currenUser) {
        this.props.fetchAllUsers();
      }
    }
  }),
  withHandlers({
    formSubmission: ({
      email,
      password,
      passwordR,
      signUp,
      allUsers,
      setFormError
    }) => ev => {
      ev.preventDefault();
      if (allUsers.filter(user => user.email === email).length > 0) {
        setFormError("This email is already taken");
      } else if (password !== passwordR) {
        setFormError("Passwords should match");
      } else if (!email || !password || !passwordR) {
        setFormError("All fields should be filled");
      } else {
        signUp(email, password);
        setFormError(null);
      }
    }
  })
);

export default enhancer(RegisterForm);
