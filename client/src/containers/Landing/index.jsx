// Dependencies
import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Components & Containers
import "./style.css";
import Home from "../Home";
import Header from "../Header";
import Footer from "../Footer";
import StorieDetail from "../StorieDetail";

export default class Landing extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
      selectedLan: "en"
    };
  };
  
  handleLanguage = lan => {
    this.setState({ selectedLan: lan.toLowerCase() }, () => {
      this.props.handleLanguage(this.state.selectedLan);
    });
  };

  render() {
    const { match, location, history } = this.props;
    return <div>
        <Header handleLanguage={this.handleLanguage} />
          <Route exact path={`${match.url}`} render={() => <Home lan={this.state.selectedLan} />} />
        <Footer />
      </div>;
  }
}
