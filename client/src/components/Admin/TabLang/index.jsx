// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";

export default class TabLang extends Component {
  render() {
    return (
      <div>
         <div className="langContainer">
          <div className="flagContainer">
            <img src="/spain.png" alt="spanish" className="flagContainer__ico"/>
            <p className="flagContainer__name">Spanish</p>
          </div>
          <div className="flagContainer">
            <img src="/usa.png" alt="english" className="flagContainer__ico"/>
            <p className="flagContainer__name">English</p>
          </div>
         </div> 
      </div>
    )
  }
}
