import React from "react";
import { compose } from "ramda";
import { withHandlers, withState } from "recompose";
import { connect } from "react-redux"
import { loginUser } from "../actions/auth"
import { Link } from "react-router-dom";

const Login = ({ formSubmission, email, password, setEmail, setPassword }) => (
  <form className="Login" onSubmit={formSubmission}>
    <h1>Login</h1>
    <label>Email:</label>
    <input value={email} onChange={ev => setEmail(ev.target.value)} />

    <label>Password:</label>
    <input
      value={password}
      onChange={ev => setPassword(ev.target.value)}
    />

    <button>Submit</button>

    <Link to={`/register`} >Sign up</Link>
  </form>
);

const enhancer = compose(
  withState("email", "setEmail", ""),
  withState("password", "setPassword", ""),
  connect(
    // state => ({
    //   currenUser: getCurrentUser(state)
    // }),
    null,
    dispatch => ({
      login: (email, password ) => dispatch(loginUser(email, password ))
    })
  ),
  withHandlers({
    formSubmission: ({ email, password, login }) => ev => {
      ev.preventDefault();
      if (email && password) {
        console.log("login")
            login(email, password );
      }
    }
  })
);

export default enhancer(Login);
