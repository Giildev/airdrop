// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class componentName extends Component {
  render() {
    return (
      <section className="fundsRecipents">
        <h2 className="funds__title">Airdrop Funds Raised</h2>
        <div className="funds__container">
          <div className="funds__container__left">
            <img src="/fundsLeft.png" alt="" />
          </div>
          <div className="funds__container__middle">
            <div className="funds__container__middle__outerBox">
              <div className="funds__container__middle__innerBox">
                <div className="funds__container__middle__innerBox__bar" />
                <div
                  className="funds__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="34093 USD Raised"
                />
              </div>
            </div>
          </div>
          <div className="funds__container__right">
            <img src="/fundsRight.png" alt="" />
            <h3>
              1000000 USD <br /> Goal
            </h3>
          </div>
        </div>
        <h2 className="recipents__title">Venezuelan Recipents</h2>
        <div className="recipents__container">
          <div className="recipents__container__left">
            <img src="/recipentsLeft.png" alt="" />
          </div>
          <div className="recipents__container__middle">
            <div className="recipents__container__middle__outerBox">
              <div className="recipents__container__middle__innerBox">
                <div className="recipents__container__middle__innerBox__bar" />
                <div
                  className="recipents__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="22230 Verified Users"
                />
              </div>
            </div>
          </div>
          <div className="recipents__container__right">
            <img src="/recipentsRight.png" alt="" />
            <h3 />
          </div>
        </div>
        <button className="fundsRecipents__buttonBox">Donate Crypto</button>
      </section>
    );
  }
}
