// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";
import {CoinCard} from "../../components/Card";

export default class Donate extends Component {
  render() {
    return (
      <div>
        <div className="donateContainer">
          <div className="donateContainer__title">Donate to AirDrop Venezuela</div>
          <div className="donateContainer__subtitle">
            Donation amounts are updated daily and distributed evenly in the value donated in to each recipients AirTM wallet.
          </div>
          <div className="donateContainer__warning">
            DO NOT DONATE TO ANY ADDRESSES LISTED OUTSIDE OF AIRDROPVENEZUELA.ORG.
          </div>
          <div className="cardsContainer">
            <CoinCard />
            <CoinCard />
            <CoinCard />
            <CoinCard />
            <CoinCard />
            <CoinCard />
          </div>
          <div className="donateContainer__message">Cryptocurrency totals + $10k will be converted into USD upon distribution.</div>
        </div>
      </div>
    )
  }
}
