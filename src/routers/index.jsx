import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import Tasks from "../components/Tasks";
import Users from "../components/Users";
import Reports from "../components/Reports";
import Attendance from "../components/Attendance";

const RouterOutlet = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/users" component={Users} />
      <Route path="/reports" component={Reports} />
      <Route path="/attendance" component={Attendance} />
    </Switch>
  );
};

export default RouterOutlet;
