// Dependencies
import React, { Component } from 'react'
import axios from "axios"
import config from "../../libs/config"
// Components & Containers
import "./style.css";

export default class MailList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: props.title || "Join our mailing list." ,
      description: props.description || "Stay informed about Airdrop Venezuela milestones and stories from donation recipients.",
      email: ""
    }

  }

  handleSubscription = (value) => {
    this.setState({ email: value })
  }

  getSubscriber = (e) => {
    e.preventDefault();
    
    let body = {
      email: this.state.email
    }

    axios.put(`${config.BASE_URL}/subscribe`, body)
      .then(res => {
        let data = res.data
        if (data.success && res.status === 200) {
          alert(data.msg);
          this.inputSubscription.value = "";
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { title, description } = this.state;
    console.log(this.state)
    return <div>
        <div className="containerMail">
          <div className="containerMail__title">{`${ title }`}</div>
          <div className="containerMail__subTitle">
            {`${ description }`}
          </div>
        <form className="containerMail__form" onSubmit={this.getSubscriber} autoComplete="off">
          <input type="email" name="email" className="containerMail__form__mail" placeholder="Enter Email Address" value={this.state.email} ref={el => (this.inputSubscription = el)} onChange={(e) => this.handleSubscription(e.target.value)}/>
            <button type="submit" className="containerMail__form__btn">
              Stay Informed
            </button>
          </form>
        </div>
      </div>;
  }
}
