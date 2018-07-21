// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class componentName extends Component {
  render() {
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
            <p>
              Venezuela should be among the most prosperous nations. Its oil
              reserves are estimated to be the largest in the world. It has
              a young and well-educated population and a dynamic culture
              founded in principles of freedom and fearless opposition to
              tyranny.
            </p>
            <p>
              Today Venezuela has a chaotic and isolated economy, plagued by
              hyperinflation, food shortages, international sanctions, and
              oppression of political dissent. Due to artificially-rigged
              government exchange rates, the banks in Venezuela are not used
              for remittance, payments, or donations. Venezuela needs better
              money. Venezuela needs cryptocurrency.
            </p>
            <p>
              Airdrop Venezuela’s mission is to send $1,000,000 in
              crypto-connected digital money to 100,000 ID-authenticated
              Venezuelans, distributing $10 each straight to their AirTM
              e-wallet. Ten dollars can help a family purchase food,
              medicine, and scarce imported goods. Access to digital money
              can help introduce Venezuelans to cryptocurrencies, online
              freelancer platforms, ecommerce, investments, donations and
              other income generating web-based opportunities.
            </p>
            <p>
              Airdrop Venezuela is powered by <a href="http://airtm.io" className="quote__container__rightCol__color">
                AirTM
              </a>, an e-wallet connected to bank networks and e-money systems all over the world (including Venezuela) via direct bank connections and a peer-to-peer network of cryptocurrency buyers and sellers.. AirTM is used by thousands of Venezuelans everyday. Over the past three years, AirTM has become expert at authenticating digital identities to prevent fraud.
            </p>
            <p>
              <a href="http://airtm.io" className="quote__container__rightCol__color">
                Join AirTM
              </a> to give Venezuelans access to digital cash that can be withdrawn as local money (Bolívares) at free market rates.
            </p>
          </div>
        </div>
      </section>;
  }
}
