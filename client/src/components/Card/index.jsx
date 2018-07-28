// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../libs/config";
import Auth from "../../services/authService";

// Components & Containers
import "./style.css";
import Icons from "../../icons.svg";

var auth =  new Auth();
var headers = auth.buildAuthHeader();

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
      story: props.story,
      featured: props.story.featured
    }
  }

  onChangeFeatured = (e, id) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(id, value)
    this.setState(prevState => ({
      story: {
        ...prevState.story,
        featured: value
      }
    }))
  }

  handleFeatured = (id) => {
    this.setState({ featured: !this.state.featured }, () => {
      let body = {
        featured: this.state.featured
      }

    this.uploadStory(id, body)
      .then(res => {
        const response = res.data

        if (res.status === 200 && response.success) {
          console.log(response.msg)
        }
      })
      .catch(err => console.log(err));

    })
  }


  handleDelete = (id) => {
    const body = {
      deleted: true
    }

    this.uploadStory(id, body)
      .then(res => {
        const response = res.data

        if(res.status === 200 && response.success) {
          this.props.handleStories('delete', id);
        }
      })
      .catch(err => console.log(err));
  }

  handleEdit = (e, id) => {
    this.props.handleStories("update", id);
  }

  uploadStory = (id, body) => {
    return axios.post(`${config.BASE_URL}/story/${id}`, body, headers)
  }

  render() {
    const { story, featured } = this.state;
    return <div className="containerList">
        <img className="containerList__img" src="/storie1.jpg" alt="" />
        <div className="containerList__info">
          <h2 className="containerList__info__title">{story.title}</h2>
          <div className="containerList__info__separator" />
          <p className="containerList__info__text">{story.subtitle}</p>
        </div>
        <div className="containerList__icons">
          <p className="featured">Featured</p>
          <div className="checkbox" onClick={() => this.handleFeatured(story._id)}>
            <div className={featured ? "active" : null} data-ref={story._id} />
          </div>
          <svg className="containerList__icons__ico" onClick={e => this.handleDelete(story._id)}>
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          <svg className="containerList__icons__ico" onClick={e => this.handleEdit(e, story._id)}>
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
        </div>
      </div>;
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