// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";
import { StorieCard } from "../../components/Card";

export default class Stories extends Component {
  render() {
    return (
      <section className="storiesSection">
        <h2 className="storiesSection__title">Stories From Venezuelans</h2>
        <h3 className="storiesSection__subTitle">
          Read stories from Venezuelas during this crisis. Some identities are
          kept private.
        </h3>
        <div className="storiesSection__storiesContainer">
          <StorieCard id="first" />
          <StorieCard id="second" />
          <StorieCard id="third" />
        </div>

        <button className="storiesSection__button">More Stories</button>
      </section>
    );
  }
}
