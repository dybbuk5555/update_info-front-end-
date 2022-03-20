import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Login from "./components/login.component";
import Dashboard from "./components/dashboard.component";

class App extends Component {
  render() {

    return (
      <>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </>
    );
  }
}

export default App;
