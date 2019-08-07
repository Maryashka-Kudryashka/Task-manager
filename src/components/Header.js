import React from "react";
import { compose } from "ramda";
import { connect } from "react-redux";
import { Navbar, Button } from "react-bootstrap";

import "../styles/Header.css";
import { logoutUser } from "../actions/auth";
import { getCurrentUser } from "../reducers";

const Header = ({ logout, currentUser }) => (
  <Navbar className={"Header"}>
    <Navbar.Brand className={"title"}>Task Manager</Navbar.Brand>
    <Navbar.Toggle />
    {currentUser._id && (
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>Signed in as: {currentUser.email}</Navbar.Text>
        <Button className={"logout"} variant="secondary" onClick={() => logout()}>
          Log out
        </Button>
      </Navbar.Collapse>
    )}
  </Navbar>
);

const enhancer = compose(
  connect(
    state => ({
      currentUser: getCurrentUser(state)
    }),
    dispatch => ({
      logout: () => dispatch(logoutUser())
    })
  )
);

export default enhancer(Header);
