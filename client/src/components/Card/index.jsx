// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../libs/config";
import Auth from "../../services/authService";

// Components & Containers
import "./style.css";
import Icons from "../../icons.svg";

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

//card StorieListAdmin
export class StorieCardAdmin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      story: props.story
    }
  }

  handleFeatured = (e, id) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(prevState => ({
      story: {
        ...prevState.story,
        featured: value
      }
    }))
    console.log(id)
    // axios
    //   .post(`${config.BASE_URL}/story/${id}`, this.headers)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err));
  }

  render() {
    const { story } = this.state;
    return (
      <div className="containerList">
        <img className="containerList__img" src="/storie1.jpg" alt="" />
        <div className="containerList__info">
          <h2 className="containerList__info__title">Mauro</h2>
          <div className="containerList__info__separator"></div>
          <p className="containerList__info__text">
            hola mauro
          </p>
        </div>
        <div className="containerList__icons">
          <p className="featured">Featured</p>
          <div className="checkbox">
            <div className="active"></div>
          </div>
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
        </div>
      </div>
    );
  }
}

//card StorieListDonation
export class StorieCardDonation extends Component {
  render() {
    return (
      <div className="containerList">
        <img className="containerList__img--coin" src="/coin.png" alt="" />
        <div className="containerList__info">
          <h2 className="containerList__info__title">Bitcoin</h2>
          <div className="containerList__info__separator"></div>
          <p className="containerList__info__text">
            3Amm1Yo2BQ1zcEdgjFHoHjT72Cg2gkg2pL
          </p>
        </div>
        <div className="containerList__icons">
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
        </div>
      </div>
    );
  }
}

//card StorieListDonation
export class CardRaised extends Component {
  render() {
    return (
      <div className="containerList">
       
        <div className="containerList__info">
          <h2 className="containerList__info__title">Amount Rised</h2>
          <br/>          
          <div className="funds__container__middle">
            <div className="funds__container__middle__outerBox">
              <div className="funds__container__middle__innerBox">
                <div className="funds__container__middle__innerBox__bar" />
                <div
                  className="funds__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="34093 USD Raised"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="containerList__icons">
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
        </div>
      </div>
    );
  }
}

//card StorieListDonation
export class CardRaisedUsers extends Component {
  render() {
    return (
      <div className="containerList">
       
        <div className="containerList__info">
          <h2 className="containerList__info__title">Verified Users</h2>
          <div className="recipents__container__middle">
            <div className="recipents__container__middle__outerBox">
              <div className="recipents__container__middle__innerBox">
                <div className="recipents__container__middle__innerBox__bar" />
                <div
                  className="recipents__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="22230 Verified Users"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="containerList__icons">
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
        </div>
      </div>
    );
  }
}

//card TimeLine ListCard
export class TimeLineListCard extends Component {
  render() {
    return (
      <div className="containerList">
        <div className="containerList__info">
          <h2 className="containerList__info__title">Time line title</h2>
          <div className="containerList__info__separator"></div>
          <p className="containerList__info__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque fugiat praesentium nihil sit
          </p>
          <div className="dateContainer">
            <div className="dateContainer__col">
              <h4 className="dateContainer__title">Starting Date</h4>
              <p className="dateContainer__text">
                21/11/2017 
              </p>
            </div>
            <div className="dateContainer__col">
              <h4 className="dateContainer__title">Finish Date</h4>
              <p className="dateContainer__text">
                28/11/2017 
              </p>
            </div>
          </div>
        </div>
        <div className="containerList__icons">
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          <svg className="containerList__icons__ico">
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
        </div>
      </div>
    );
  }
}