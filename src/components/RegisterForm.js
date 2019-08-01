import React from "react";
import { compose } from "ramda";
import { withHandlers, withState } from "recompose";
import { connect } from "react-redux";
import { signUpUser, allUsers } from "../actions/auth";
import { getAllUsers } from "../reducers";
import { lifecycle } from "recompose";

import { Link } from "react-router-dom";

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
  <form className="RegisterForm" onSubmit={formSubmission}>
    <h1>Sign up</h1>
    <label>Email:</label>
    <input value={email} onChange={ev => setEmail(ev.target.value)} />

    <label>Password:</label>
    <input value={password} onChange={ev => setPassword(ev.target.value)} />

    <label>Repeat password:</label>
    <input value={passwordR} onChange={ev => setPasswordR(ev.target.value)} />

    <span>{formError}</span>

    <button>Sign up</button>
    <Link to={`/login`}>Login</Link>
  </form>
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
      if (allUsers.filter(user => user.email == email).length > 0) {
        setFormError("This email is already taken");
      } else if (password != passwordR) {
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
