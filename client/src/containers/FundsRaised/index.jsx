// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class componentName extends Component {
  render() {
    return (
      <section className="fundsRecipents">
        <h2>Airdrop Funds Raised</h2>
        <div className="funds__container">
          <div className="funds__container__left">1</div>
          <div className="funds__container__middle">2</div>
          <div className="funds__container__right">3</div>
        </div>
        <h2>Venezuelan Recipents</h2>
        <div className="recipents__container">
          <div className="recipents__container__left">1</div>
          <div className="recipents__container__middle">2</div>
          <div className="recipents__container__right">3</div>
        </div>
      </section>
    );
  }
}
