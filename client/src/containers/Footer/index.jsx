// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer__menu">
          <a href="#About" className="footer__menu__item">
            About Us
          </a>
          <a href="#Stories" className="footer__menu__item">
            Stories
          </a>
          <a href="#Donate" className="footer__menu__item">
            Donate
          </a>
          <a href="#FAQ" className="footer__menu__item">
            FAQ
          </a>
          <a href="#Contact" className="footer__menu__item">
            Contact
          </a>
        </div>
        <div className="footer__follow">
          <div className="footer__follow__text">Follow US</div>
          <div className="footer__follow__icoCont">
            <a href="https://www.facebook.com/airtmLatAm" target="_blank">
              <img className="footer__follow__icon" src="fb.png" alt="" />
            </a>
            <a href="https://twitter.com/theairtm" target="_blank">
              <img className="footer__follow__icon" src="tw.png" alt="" />
            </a>
          </div>
        </div>
        <div className="footer__copyright">
          Website developed & designed with{" "}
          <span className="footer__copyright__hearth">❤</span> for Venezuela by
          Venezuelans. AirTM ©2018
        </div>
      </footer>
    );
  }
}
