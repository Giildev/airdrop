// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export class HIWCard extends Component {
  render() {
    return (
      <div className="hiwcard">
        <div className="hiwcard__iconBox">
          <div className="hiwcard__iconBox__imgBox">
            <img src="/hiwIcon.png" alt="" />
          </div>
        </div>
        <div className="hiwcard__title">{this.props.title}</div>
        <div className="hiwcard__subTitle">{this.props.subTitle}</div>
      </div>
    );
  }
}

export class TimeLineCard extends Component {
  render() {
    return (
      <div>
        <div className="TimeContainer">
          <div className="topBarTime"></div>
          <p className="TimeContainer__cardTitle">Public Launch, 7/2017:</p>
          <p className="TimeContainer__cardContent">AirdropVenezuela.org live donations</p>
          <p className="TimeContainer__cardTitle">Campaing Period, 7/16 - 9/14:</p>
          <p className="TimeContainer__cardContent">Open for donations and Venezuelan participants.</p>
        </div>
      </div>
    );
  }
}

export class CoinCard extends Component {
  render() {
    return (
      <div>
        <p>Code</p>
      </div>
    );
  }
}
