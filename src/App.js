import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Profile from "./components/Profile";

import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);


  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;