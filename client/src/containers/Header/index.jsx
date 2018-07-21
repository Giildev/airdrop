// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__logoBox">
          <img src="/logo.png" alt="" className="header__logo" />
          <img src="/hamburguer.png" alt="" className="header__ico" />
        </div>
        <nav className="header__menu">
          <a href="#About" className="header__menu__item">
            About
          </a>
          <a href="#Stories" className="header__menu__item">
            Stories
          </a>
          <a href="#Donate" className="header__menu__item">
            Donate
          </a>
          <a href="#FAQ" className="header__menu__item">
            FAQ
          </a>
          <a href="#Contact" className="header__menu__item">
            Contact
          </a>
        </nav>
        <div className="header__cta">
          <button className="header__cta__button">Donate Crypto</button>
        </div>
      </header>
    );
  }
}
