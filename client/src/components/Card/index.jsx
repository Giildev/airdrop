// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export class HIWCard extends Component {
  render() {
    return (
      <div className="hiwcard">
        <div className="hiwcard__iconBox">
          <div className="hiwcard__iconBox__imgBox">
            <img src="/hiwIcon.png" alt="" />
          </div>
        </div>
        <div className="hiwcard__title">{this.props.title}</div>
        <div className="hiwcard__subTitle">{this.props.subTitle}</div>
      </div>
    );
  }
}

export class TimeLineCard extends Component {
  render() {
    return (
      <div>
        <div className="TimeContainer">
          <div className="topBarTime" />
          <p className="TimeContainer__cardTitle">Public Launch, 7/2017:</p>
          <p className="TimeContainer__cardContent">
            AirdropVenezuela.org live donations
          </p>
          <p className="TimeContainer__cardTitle">
            Campaing Period, 7/16 - 9/14:
          </p>
          <p className="TimeContainer__cardContent">
            Open for donations and Venezuelan participants.
          </p>
        </div>
      </div>
    );
  }
}

export class StorieCard extends Component {
  render() {
    return (
      <div className="stories">
        <img className="stories__img" src="/storie1.jpg" alt="" />
        <h2 className="stories__title">Bracelet Maker Tulio Benitez</h2>
        <p className="stories__storie">
          He started creating bracelets and selling them on the streets in
          Cúcuta, Colombia. Initially scared to make a Venezuela bracelet
          because he might be spotted by police and taken...
        </p>
        <a href="#" className="stories__more">
          View More
        </a>
      </div>
    );
  }
}

export class CoinCard extends Component {
  render() {
    return (
      <div>
        <div className="coinCardC">
          <div className="topBarCoin"></div>
          <div className="coinInfo">
            <div className="coinInfo__icon">
              <img src="/coin.png" alt="CoinName" />
            </div>
            <div className="coinInfo__text">
              <div className="coinInfo__text__name">Zcash (t-addr)</div>
              <div className="coinInfo__text__amountR">1.1 ZEC Raised</div>
              <div className="coinInfo__text__pseudoName">z.cash</div>
            </div>
          </div>
          <div className="coinWallet">
            <div className="coinWallet__title">Wallet</div>
            <div className="coinWallet__address">t1Wd5wnJC7uQ7yGbgnEHYt1GowXouHgFMC7</div>
            <div className="coinWallet__qr">
              <img src="/qr.png" alt="QR" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
