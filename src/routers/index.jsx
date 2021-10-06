import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Tasks from "../components/Tasks";
import Users from "../components/Users";

const RouterOutlet = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/users" component={Users} />
    </Switch>
  );
};

export default RouterOutlet;
