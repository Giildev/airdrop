// Dependencies
import React, { Component } from 'react'
import Toggle from 'react-toggle'

// Components & Containers
import "./style.css";

export default class TabLang extends Component {
  render() {
    return <div>
        <div className="langContainer">
        <label>
          <Toggle/>
          <span>Custom className</span>
        </label>
        </div>
      </div>;
  }
}
