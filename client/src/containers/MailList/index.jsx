// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";

export default class MailList extends Component {
  render() {
    return (
      <div>
        <div className="containerMail">
          <div className="containerMail__title">Join Our Mailing List</div>
          <div className="containerMail__subTitle">Stay informed about Airdrop Venezuela milestones and stories from donation recipients.</div>
          <form className="containerMail__form">
            <input type="text" className="containerMail__form__mail" placeholder="Enter Email Address"/>
            <button className="containerMail__form__btn">Stay Informed</button>
          </form>
        </div>
      </div>
    )
  }
}
