// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";

export default class Faq extends Component {

  constructor (props) {
    super(props)
    this.acc = document.getElementsByClassName("containerFaq__open__header");

    this.state = {
      faqs: props.faqs || "question"      
    }
  }

  toggleAccordion = () => {
    let i;

    for (i = 0; i < this.acc.length; i++) {
      this.acc[i].onclick = function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      };
    }
  }

  render() {
    const { faqs } = this.state;
    console.log("PROPS_DATA_FAQS:", this.props.faqs);
    return (
      <div id="FAQ">
        <div className="containerFaq">
          <div className="containerFaq__title">FAQ</div>
          <div className="containerFaq__open">
            {}
            <div className="containerFaq__open__header" onClick={this.toggleAccordion}>
              <h4 className="containerFaq__open__header__title"> { `${faqs.question}` }</h4>
              <img src="/faqArrow.png" alt="Arrow"/>
            </div>
            <div className="containerFaq__open__content">
              <p className="containerFaq__open__content__text">
              { `${faqs.answer}` }
              </p>
            </div>
          </div>
          
          <div className="containerFaq__open">
            <div className="containerFaq__open__header" onClick={this.toggleAccordion}>
              <h4 className="containerFaq__open__header__title"> What is AirTM?</h4>
              <img src="/faqArrow.png" alt="Arrow"/>
            </div>
            <div className="containerFaq__open__content">
              <p className="containerFaq__open__content__text">
                AirTM is a digital wallet connected to banks and blockchains, both directly and via a peer-to-peer exchange. AirTM’s provides globally-connected financial services to consumers and businesses in the developing world, including remittance, payments, donations,as well as access to global ecommerce and cryptocurrency. AirTM empowers people in countries with devaluing currencies, hyperinflation,and limited banking systems to exchange local money for digital currency at a free market rate.
              </p>
            </div>
          </div>
 
        </div>
      </div>
    )
  }
}
