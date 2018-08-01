// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class Banner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      img: props.image || "banner.jpg",
      title: undefined || props.title,
      description: undefined || props.description 
    }
  }

  render() {
    const { img, title, description } = this.state;
    // Divide for words 
    const splittedTitle = title.split(" ");
    let restWords = "";
    // then unite words after position 4 to forward to complete the sentence
    for (let i = 4; i < splittedTitle.length; i++) {
      restWords += splittedTitle[i] + " ";
    }
    return (
      <section
        style={{ backgroundImage: `url(/${img})` }}
        className="banner"
      >
        <div className="banner__container">
          <h1 className="banner__container__mainTitle">
            <span className="banner__container__mainTitle__color">
              {`${splittedTitle[0]} ${splittedTitle[1]}`} &nbsp;
            </span>
            {`${splittedTitle[2]} ${splittedTitle[3]}`} <br />
            {`${ restWords }`}
          </h1>
          <div className="banner__container__subTitle">
            {description}
          </div>
          <div className="banner__container__scroll">
            <a href="#howItWorks">
              <img src="/arrow.png" alt="" />
            </a>
          </div>
        </div>
      </section>
    );
  }
}
