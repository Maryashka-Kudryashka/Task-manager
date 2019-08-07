import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./Login";
import Tasks from "./Tasks";
import Loader from "./Loader";
import Header from "./Header";
import RegisterForm from "./RegisterForm";

import { fetchCurrentUser } from "../actions/auth";
import { getCurrentUser, getUserFetching } from "../reducers";

const PrivateRoute = ({ user, isUserFetching, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserFetching ? (
        <Loader />
      ) : user._id ? (
        <Tasks {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const App = ({ currentUser }) => (
  <div className={"App"}>
    <Header />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={RegisterForm} />
      <PrivateRoute path="/" exact user={currentUser} />
    </Switch>
  </div>
);

const enhancer = compose(
  connect(
    state => ({
      currentUser: getCurrentUser(state),
      isUserFetching: getUserFetching(state)
    }),
    dispatch => ({
      fetchCurrentUserFunc: () => dispatch(fetchCurrentUser())
    })
  ),
  lifecycle({
    componentWillMount() {
      if (!this.props.currenUser) {
        this.props.fetchCurrentUserFunc();
      }
    }
  })
);

export default enhancer(App);
