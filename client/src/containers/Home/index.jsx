// Dependencies
import React, { Component } from "react";
import Header from "../Header";
import Banner from "../Banner";
import HowItWorks from "../HowItWorks";

// Components & Containers
import "./style.css";

export default class componentName extends Component {
  render() {
    return (
      <div>
        <Header />
        <Banner />
        <HowItWorks />
      </div>
    );
  }
}
