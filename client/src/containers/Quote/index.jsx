// Dependencies
import React, { Component } from "react";
import ReactHtmlRender from "react-html-parser"
// Components & Containers
import "./style.css";

export default class Quote extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: undefined || props.title,
      description: undefined || props.description
    }
  }

  render() {
    const { title, description } = this.state;
    return <section className="quote" id="About">
        <div className="quote__text">
          <div className="quote__text__quote">
            “A people that loves freedom will in the end be free.”
          </div>
          <div className="quote__text__author">- Simon Bolivar -</div>
        </div>
        <div className="quote__container">
          <div className="quote__container__leftCol">
            <img src="/mapDrop.png" alt="AirDrop" className="imgResponsive" />
          </div>
          <div className="quote__container__rightCol">
            {ReactHtmlRender(description)}
          </div>
        </div>
      </section>;
  }
}
