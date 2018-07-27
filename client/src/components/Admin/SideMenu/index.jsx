// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";

export default class SideMenu extends Component {
  render() {
    return (
      <div>
        <div className="sideContainer">
          <img src="/storie1.jpg" alt="profile" className="sideContainer__profilePic"/>
          <h3 className="sideContainer__title">Admin</h3>
          <ul className="sideContainer__menu">
            <li className="sideContainer__menu__item">Site</li>
            <li className="sideContainer__menu__item">Storys</li>
            <li className="sideContainer__menu__item">Donations</li>
            <li className="sideContainer__menu__item">Amounts Rised</li>
            <li className="sideContainer__menu__item">FAQ's</li>
            <li className="sideContainer__menu__item">Log Out</li>
          </ul>
        </div>
      </div>
    )
  }
}
