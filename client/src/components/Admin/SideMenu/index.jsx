// Dependencies
import React, { Component } from 'react'
import { Link } from "react-router-dom";

// Components & Containers
import "./style.css";

export default class SideMenu extends Component {
  render() {
    return <div>
        <div className="sideContainer">
          <img src="/storie1.jpg" alt="profile" className="sideContainer__profilePic" />
          <h3 className="sideContainer__title">Admin</h3>
          <ul className="sideContainer__menu">
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/manage`}>Site</Link>
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
            <li className="sideContainer__menu__item">
              <a  >Log Out </a>
            </li>
          </ul>
        </div>
      </div>;
  }
}
