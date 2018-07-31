// Dependencies
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Auth from "../../../services/authService"

// Components & Containers
import "./style.css";

export default class SideMenu extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
  }

  render() {
    return <div>
        <div className="sideContainer">
          <img src="/storie1.jpg" alt="profile" className="sideContainer__profilePic" />
          <h3 className="sideContainer__title">Admin</h3>
          <ul className="sideContainer__menu">
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard`}>Site</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/stories`}>Stories</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/donations`}>Donations</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/amount`}>Amounts Rised</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/timeline`}>TimeLine</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/faqs`}>FAQ's</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/users`}>Users</Link>
            </li>
            <li className="sideContainer__menu__item" onClick={e => this.auth.logout(e)}>
              <a  >Log Out </a>
            </li>
          </ul>
        </div>
      </div>;
  }
}
