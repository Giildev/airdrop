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
        <p>Code</p>
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
