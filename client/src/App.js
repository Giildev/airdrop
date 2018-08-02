// Dependencies
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components & Containers
import Home from "./containers/Home/";
import NotFound from "./containers/NotFound";
import Login from "./components/Admin/Login";
import SwitchLan from "./components/SwitchLan";
import Dashboard from "./containers/Dashboard";
import StorieDetail from "./containers/StorieDetail";
import AdminStory from "./components/Admin/Stories";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/login"} component={Login} />
          <Route path={"/dashboard"} component={Dashboard} />
          <Route exact path={"/stories/:title?"} component={StorieDetail} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
