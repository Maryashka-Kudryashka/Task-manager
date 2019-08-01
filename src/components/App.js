import React from "react";
import { compose } from "ramda";
import { withHandlers, withState } from "recompose";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Tasks from "./Tasks";
import RegisterForm from "./RegisterForm"
import { getCurrentUser } from "../reducers";
import { connect } from "react-redux";
import { lifecycle } from "recompose";
import { fetchCurrentUser } from "../actions/auth"

const PrivateRoute = ({ user, ...rest }) => (
  console.log(user, "user"),
  (
    <Route
      {...rest}
      render={props =>
        user ? (
          (console.log(user, "user"), <Tasks {...props} />)
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
  )
);

const App = ({ currentUser }) => (
  console.log(currentUser, "current"),
  (
    <div className={"App"}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterForm} />
        <PrivateRoute path="/" exact user={currentUser.user} />
      </Switch>
    </div>
  )
);

const enhancer = compose(
  connect(
    state => ({
      currentUser: getCurrentUser(state)
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
