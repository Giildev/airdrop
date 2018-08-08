// Dependencies
import React, { Component } from "react";
import ReactHtmlRender from "react-html-parser"

// Components & Containers
import "./style.css";

export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.acc = document.getElementsByClassName("containerFaq__open__header");

    this.state = {
      faqs: props.faqs || "question"
    };
  }

  shouldComponentUpdate = (nextProps) => {
    const { faqs } = this.state;
    if ( faqs !== nextProps.faqs) {
      this.setState({
        faqs: nextProps.faqs,
      })
    }
    return true;
  }


  toggleAccordion = (e) => {
    e.preventDefault();
    let i;
    for (i = 0; i < this.acc.length; i++) {
      this.acc[i].onclick = function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      };
    }
  };

  render() {
    const { faqs } = this.state;
    return (
      <div id="FAQ">
        <div className="containerFaq">
          <div className="containerFaq__title">FAQ</div>
          {faqs.map(faq => (            
            <div key={faq._id} className="containerFaq__open">
              <div
                className="containerFaq__open__header"
                onClick={this.toggleAccordion}
              >
                <h4 className="containerFaq__open__header__title">
                  {" "}
                  {`${faq.question}`}
                </h4>
                <img src="/faqArrow.png" alt="Arrow" />
              </div>
              <div className="containerFaq__open__content">
                <p className="containerFaq__open__content__text">
                 {ReactHtmlRender(faq.answer)}
                  {/*`${faq.answer}`*/}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
