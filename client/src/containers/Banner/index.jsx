// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class Banner extends Component {
  render() {
    return (
      <section
        style={{ backgroundImage: `url("/banner.jpg")` }}
        className="banner"
      >
        <div className="banner__container">
          <h1 className="banner__container__mainTitle">
            <span className="banner__container__mainTitle__color">
              Help Send &nbsp;
            </span>
            $10 to <br />
            100,000 Venezuelans
          </h1>
          <div className="banner__container__subTitle">
            Cryptocurrency is unstoppable. No country needs it more than
            Venezuela.
          </div>
          <div className="banner__container__scroll">Flechita</div>
        </div>
      </section>
    );
  }
}
