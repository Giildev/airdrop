// Dependencies
import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import config from "../../libs/config";
import Auth from "../../services/authService";
import { Tooltip } from "react-tippy";

// Components & Containers
import "./style.css";
import "react-tippy/dist/tippy.css";
import Icons from "../../icons.svg";

var auth =  new Auth();
var headers = auth.buildAuthHeader();
var calculatePercent = amount => (amount.raised * 100) / amount.goal;

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
  constructor(props) {
    super(props)
  
    this.state = {
       timeline: props.timeline
    }
  }
  

  render() {
    const { timeline } = this.state;
    return (
      <div>
        <div className="TimeContainer">
          <div className="topBarTime" />
          <p className="TimeContainer__cardTitle">{timeline.title}:</p>
          <p className="TimeContainer__cardContent">
          {timeline.event}
          </p>
          {/*<p className="TimeContainer__cardTitle">
            Campaing Period, 7/16 - 9/14:
          </p>
          <p className="TimeContainer__cardContent">
            Open for donations and Venezuelan participants.
          </p>*/}
        </div>
      </div>
    );
  }
}

export class StorieCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {      
        title: props.title,
        cover: props.cover,
        subtitle: props.subtitle,
        content: props.content      
    }
  }
  
  render() {
    const { title, cover, subtitle, content } = this.state;        
    return (
      <div className="stories">
        <img className="stories__img" src={`/${cover}`} alt="" />
        <h2 className="stories__title">{`${title}`}</h2>
        <p className="stories__storie">
        {`${content}`}
        </p>
        <a href="#" className="stories__more">
          View More
        </a>
      </div>
    );
  }
}

export class CoinCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       donationData: props.donationData
    }
  }
  
  render() {
    const { donationData } = this.state;    
    return (
      <div>
        <div className="coinCardC">
          <div className="topBarCoin"></div>
          <div className="coinInfo">
            <div className="coinInfo__icon">
              <img src={`/${donationData.icon}`} alt="CoinName" />
            </div>
            <div className="coinInfo__text">
              <div className="coinInfo__text__name">{`${donationData.coin}`}</div>
              <div className="coinInfo__text__amountR">{`${donationData.amount}`}</div>
              <div className="coinInfo__text__pseudoName">{`${donationData.symbol}`}</div>
            </div>
          </div>
          <div className="coinWallet">
            <div className="coinWallet__title">Wallet</div>
            <div className="coinWallet__address">{`${donationData.wallet}`}</div>
            <div className="coinWallet__qr">
              <img src={`/${donationData.QR}`} alt="QR" />
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

    this.form = new FormData();

    this.state = {
      story: props.story,
      featured: props.story.featured
    }
  }

  shouldComponentUpdate = (nextprops, nextstate) => {
    if (this.state.story !== nextprops.story) {
      this.setState({ story: nextprops.story, featured: nextprops.story.featured })
    }
    return true;
  };

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
    this.form.set('data', JSON.stringify(body));
    return axios.post(`${config.BASE_URL}/story/${id}`, this.form, headers)
  }

  render() {
    const { story, featured } = this.state;
    return <div className="containerList">
        <img className="containerList__img" src={`/${story.cover}`} alt="" />
        <div className="containerList__info">
          <h2 className="containerList__info__title">{story.title}</h2>
          <div className="containerList__info__separator" />
          <p className="containerList__info__text">{story.subtitle}</p>
        </div>
        <div className="containerList__icons">
          <p className="featured">Featured</p>
          <div className="checkbox" onClick={() => this.handleFeatured(story._id)}>
            <div className={featured ? "activeCheck" : null} data-ref={story._id} />
          </div>
          <Tooltip
            title="Delete"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleDelete(story._id)}>
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          </Tooltip>
          <Tooltip
            title="Edit"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleEdit(e, story._id)}>
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
          </Tooltip>
        </div>
      </div>;
  }
}

//card StorieListDonation
export class StorieCardDonation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      donation: props.donation,
    }
  }

  shouldComponentUpdate = (nextprops, nextstate) => {
    if (this.state.donation !== nextprops.donation) {
      this.setState({ donation: nextprops.donation })
    }
    return true;
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    const body = {
      deleted: true
    }

    this.uploadStory(id, body)
      .then(res => {
        const response = res.data

        if (res.status === 200 && response.success) {
          this.props.handleDonations("delete", id);
        }
      })
      .catch(err => console.log(err));
  }

  handleEdit = (e, id) => {
    this.props.handleDonations("update", id);
  }

  uploadStory = (id, body) => {
    return axios.post(`${config.BASE_URL}/donation/${id}`, body, headers)
  }

  render() {
    const { donation } = this.state
    return (
      <div className="containerList">
        <img className="containerList__img--coin" src={donation.icon === "" ? "/coin.png" : `/${donation.icon}`} alt={donation.coin} />
        <div className="containerList__info">
          <h2 className="containerList__info__title">{ donation.coin }</h2>
          <div className="containerList__info__separator"></div>
          <p className="containerList__info__text">
            { donation.wallet }
          </p>
        </div>
        <div className="containerList__icons">
          <Tooltip
            title="Delete"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleDelete(e, donation._id)}>
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          </Tooltip>
          <Tooltip
            title="Edit"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleEdit(e, donation._id)}>
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
          </Tooltip>
        </div>
      </div>
    );
  }
}

//card StorieListDonation
export class CardRaised extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: props.amount,
      percent: calculatePercent(props.amount)
    }
  }

  shouldComponentUpdate = (nextprops, nextstate) => {
    if (this.state.amount !== nextprops.amount) {
      this.setState({ amount: nextprops.amount }, () => {
        const { amount } = this.state;
        let percent = calculatePercent(amount)
        this.setState({ percent })
      })
    }
    return true;
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.props.handleAmounts("fundsAmount");
  }

  render() {
    const { amount, percent } = this.state;
    return (
      <div className="containerList">
       
        <div className="containerList__info">
          <h2 className="containerList__info__title">Amount Rised</h2>
          <br/>          
          <div className="funds__container__middle">
            <div className="funds__container__middle__outerBox">
              <div className="funds__container__middle__innerBox">
                <div className="funds__container__middle__innerBox__bar" style={{ width: `${percent}%` }}/>
                <div
                  className="funds__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="34093 USD Raised"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="containerList__icons">
          <Tooltip
            title="Edit"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleEdit(e)}>
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
          </Tooltip>
        </div>
      </div>
    );
  }
}

//card StorieListDonation
export class CardRaisedUsers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: props.amount,
      percent: calculatePercent(props.amount)
    }
  }

  shouldComponentUpdate = (nextprops, nextstate) => {
    if (this.state.amount !== nextprops.amount) {
      this.setState({ amount: nextprops.amount }, () => {
        const { amount } = this.state;
        let percent = calculatePercent(amount)
        this.setState({ percent })
      })
    }
    return true;
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.props.handleAmounts("userAmount");
  }

  render() {
    const { amount, percent } = this.state;
    return (
      <div className="containerList">
       
        <div className="containerList__info">
          <h2 className="containerList__info__title">Verified Users</h2>
          <div className="recipents__container__middle">
            <div className="recipents__container__middle__outerBox">
              <div className="recipents__container__middle__innerBox">
                <div className="recipents__container__middle__innerBox__bar" style={{ width: `${percent}%` }} />
                <div
                  className="recipents__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="22230 Verified Users"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="containerList__icons">
          <Tooltip
            title="Edit"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleEdit(e)}>
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
          </Tooltip>
        </div>
      </div>
    );
  }
}

//card TimeLine ListCard
export class TimeLineListCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      line: props.line
    }
  }

  // handleLines

  handleDelete = (e, id) => {
    e.preventDefault();
    const body = {
      deleted: true
    }

    this.uploadLine(id, body)
      .then(res => {
        const response = res.data;

        if (res.status === 200 && response.success) {
          this.props.handleLines("delete", id);
        }
      })
      .catch(err => {
        let error = err.response;
        if (error.status === 401) {
          alert("Unauthorized");
        } else if (error.status === 500) {

        }
      });
  }

  handleEdit = (e, id) => {
    e.preventDefault();
    this.props.handleLines("update", id);
  }

  uploadLine = (id, body) => {
    return axios.post(`${config.BASE_URL}/timeline/${id}`, body, headers);
  }

  render() {
    const { line } = this.state;
    return (
      <div className="containerList">
        <div className="containerList__info">
          <h2 className="containerList__info__title">{ line.title }</h2>
          <div className="containerList__info__separator"></div>
          <p className="containerList__info__text">
            { line.event }
          </p>
          <div className="dateContainer">
            <div className="dateContainer__col">
              <h4 className="dateContainer__title">Starting Date</h4>
              <p className="dateContainer__text">
                { moment(line.start).format("MMM D, YYYY") }
              </p>
            </div>
            <div className="dateContainer__col">
              <h4 className="dateContainer__title">Finish Date</h4>
              <p className="dateContainer__text">
                { moment(line.end).format("MMM D, YYYY") }
              </p>
            </div>
          </div>
        </div>
        <div className="containerList__icons">
          <Tooltip
            title="Delete"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleDelete(e, line._id)}>
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          </Tooltip>
          <Tooltip
            title="Edit"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleEdit(e, line._id)}>
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
          </Tooltip>
        </div>
      </div>
    );
  }
}

//card UserList
export class UserListCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subscriber: props.subscriber
    }
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    const body = {
      deleted: true
    }

    this.uploadSubscriber(id, body)
      .then(res => {
        const response = res.data;

        if (res.status === 200 && response.success) {
          this.props.handleSubscribers("delete", id);
        }
      })
      .catch(err => {
        let error = err.response;
        if (error.status === 401) {
          alert("Unauthorized");
        } else if (error.status === 500) {

        }
      });
  }

  uploadSubscriber = (id, body) => {
    return axios.post(`${config.BASE_URL}/subscribe/${id}`, body, headers);
  }

  render() {
    const { subscriber } = this.state;
    return (
      <div className="containerList">
        <div className="containerList__info">
          <h2 className="containerList__info__title">{ subscriber.email }</h2>
          <div className="containerList__info__separator"></div>
          <p className="containerList__info__text">
            
          </p>
          <div className="dateContainer">
            <div className="dateContainer__col">
              <h4 className="dateContainer__title">Creation Date</h4>
              <p className="dateContainer__text">
                {moment(subscriber.createdAt).format("MMM D, YYYY [at] HH:mm a")}
              </p>
            </div>
          </div>
        </div>
        <div className="containerList__icons">
          <Tooltip
            title="Delete"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleDelete(e, subscriber._id)}>
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          </Tooltip>
        </div>
      </div>
    );
  }
}

//card subscribers
export class FaqCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      faq: props.faq
    }
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    const body = {
      deleted: true
    }

    this.uploadFaq(id, body)
      .then(res => {
        const response = res.data;

        if (res.status === 200 && response.success) {
          this.props.handleFaqs("delete", id);
        }
      })
      .catch(err => console.log(err));
  }

  handleEdit = (e, id) => {
    e.preventDefault();
    this.props.handleFaqs("update", id);
  }

  uploadFaq = (id, body) => {
    return axios.post(`${config.BASE_URL}/faq/${id}`, body, headers)
  }
  
  render() {
    const { faq, featured } = this.state;
    return (
      <div className="containerList">
        <div className="containerList__info">
          <h2 className="containerList__info__title">{ faq.question }</h2>
          <div className="containerList__info__separator"></div>
          <p className="containerList__info__text--faqs">
            { faq.answer }
          </p>
        </div>
        <div className="containerList__icons">
          <Tooltip
            title="Delete"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleDelete(e, faq._id)}>
            <use xlinkHref={`${Icons}#icon-trash`} />
          </svg>
          </Tooltip>
        </div>
        <div className="containerList__icons">
          <Tooltip
            title="Edit"
            position="top"
            size="big"
            arrow="true"
          >
          <svg className="containerList__icons__ico" onClick={e => this.handleEdit(e, faq._id)}>
            <use xlinkHref={`${Icons}#icon-pen`} />
          </svg>
          </Tooltip>
        </div>
      </div>
    );
  }
}


//card Slide Storie
export class SlideCard extends Component {
 
  render() {
    return (
      <div className="slideContainer">
        <div className="storieDetailContainer__main">
          <div className="storieDetailContainer__main__text">
            <h1 className="storieDetailContainer__main__text__title">Alexa Walts</h1>
            <h3 className="storieDetailContainer__main__text__subTitle">"phrase from storie"</h3>
            <p className="storieDetailContainer__main__text__content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eos perferendis, amet ratione quisquam accusantium esse nulla reiciendis, quam nemo eligendi. Impedit quidem neque rem unde labore laboriosam soluta, quia ipsam dolor iusto quibusdam laborum dolorem necessitatibus voluptatum distinctio explicabo aspernatur architecto, placeat, veritatis quaerat. Nemo harum aliquam culpa explicabo.
          </p>
          </div>
          <div className="storieDetailContainer__main__picture">
            <img className="storieDetailContainer__main__picture__img" src="/storie1.jpg" alt="" />
          </div>
        </div>
      </div>
    );
  }
}

