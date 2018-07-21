// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class Contact extends Component {
  render() {
    return <section className="contact" id="Contact">
        <div className="contact__title">Contact Us</div>
        <div className="contact__subTitle">
          Please contact <span className="contact__subTitle__color">
            donate@airdropvenezuela.org
          </span> for any questions or requests.
        </div>
      </section>;
  }
}
