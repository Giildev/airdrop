// Dependencies
import React, { Component } from "react";
import ReactHtmlRender from "react-html-parser";
// Components & Containers
import "./style.css";

export default class Contact extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      title: props.title || "Contact Us.",
      description: props.description || `Please contact <span className="contact__subTitle__color">
            donate@airdropvenezuela.org
          </span> for any questions or requests.`,
    }
  }
  
  render() {
    const { title, description } = this.state;
    return <section className="contact" id="Contact">
        <div className="contact__title">{ title }</div>
        <div className="contact__subTitle">
          {ReactHtmlRender(description)}
        </div>
      </section>;
  }
}
