// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Components & Containers
import "./style.css";
import TabLan from "../../components/Admin/TabLang"
export default class Header extends Component {
  constructor(props) {
    super(props)

  }

  handleLan = (lan) => {
    this.props.handleLanguage(lan);
  }

  render() {
    return <header className="header">
        <div className="header__logoBox">
          <Link to={`/`}>
            <img src="/logo.png" alt="" className="header__logo" />
          </Link>
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
          <a href="#Donate">        
            <button className="header__cta__button" >
              Donate Crypto
            </button>
          </a>
        </div>
        <TabLan lan={`EN`} handleLan={this.handleLan} />
      </header>;
  }
}
