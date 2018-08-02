// Dependencies
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components & Containers
import Home from "./containers/Home/";
import NotFound from "./containers/NotFound";
import Login from "./components/Admin/Login";
import Dashboard from "./containers/Dashboard";
import StorieDetail from "./containers/StorieDetail";
import Landing from "./containers/Landing"
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLan: "en"
    };
  }

  handleLanguage = lan => {
    this.setState({
      selectedLan: lan
    });
  };

  render() {
    const { selectedLan } = this.state;
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} render={(props) => <Landing handleLanguage={this.handleLanguage} {...props}/>} />
          <Route exact path={"/stories"} render={(props) => <StorieDetail lan={selectedLan.toUpperCase()} {...props}/>} />
          <Route exact path={"/login"} component={Login} />
          <Route path={"/dashboard"} component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
