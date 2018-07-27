// Dependencies
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components & Containers
import Home from "./containers/Home/";
import NotFound from "./containers/NotFound";
import Login from "./components/Admin/Login";
import SwitchLan from "./components/SwitchLan";
import Dashboard from "./containers/Dashboard";
import AdminStory from "./components/Admin/Stories";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/switch"} component={SwitchLan} />
          <Route path={"/dashboard"} component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
