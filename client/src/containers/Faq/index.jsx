// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";

export default class Faq extends Component {
  render() {
    return (
      <div>
        <div className="containerFaq">
          <div className="containerFaq__title">FAQ</div>
          <div className="containerFaq__open">
            <div className="containerFaq__open__header">
              <h4 className="containerFaq__open__header__title"> What is AirTM?</h4>
              <img src="/faqArrow.png" alt="Arrow"/>
            </div>
            <p className="containerFaq__open__text">
              AirTM is a digital wallet connected to banks and blockchains, both directly and via a peer-to-peer exchange. AirTM’s provides globally-connected financial services to consumers and businesses in the developing world, including remittance, payments, donations,as well as access to global ecommerce and cryptocurrency. AirTM empowers people in countries with devaluing currencies, hyperinflation,and limited banking systems to exchange local money for digital currency at a free market rate.
            </p>
          </div>
          <div className="containerFaq__closed">
            <div className="containerFaq__closed__header">
              <h4 className="containerFaq__closed__header__title"> How will the impact of these donations be measured?</h4>
              <img src="/faqArrowClosed.png" alt="Arrow" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
