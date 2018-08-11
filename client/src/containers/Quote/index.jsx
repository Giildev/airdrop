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
      author: props.author || ``,
      description: undefined || props.description
    }
  }

  shouldComponentUpdate = (nextProps) => {
    const { title, description, author } = this.state;
    if (title !== nextProps.title || description !== nextProps.description || author !== nextProps.author) {
      this.setState({
        title: nextProps.title,
        description: nextProps.description,
        author: nextProps.author
      })
    }
    return true;
  }

  render() {
    const { title, author, description } = this.state;
    return <section className="quote" id="About">
        <div className="quote__text">
          <div className="quote__text__quote">
            {title}
            {/*“A people that loves freedom will in the end be free.”*/}
          </div>
          <div className="quote__text__author">{`- ${ author } -`}</div>
        </div>
        <div className="quote__container">
          <div className="quote__container__leftCol">
            <img src="/mapDrop.png" alt="AirDrop" className="imgResponsive" />
          </div>
          <div className="quote__container__rightCol">
            {ReactHtmlRender(description)}
            <div className="footer__follow__icoCont">
              <a href="https://www.facebook.com/airtmLatAm" target="_blank">
                <img className="footer__follow__icon" src="fb.png" alt="" />
              </a>
              <a href="https://twitter.com/theairtm" target="_blank">
                <img className="footer__follow__icon" src="tw.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>;
  }
}
