// Dependencies
import React, { Component } from 'react'
import Toggle from 'react-toggle'

// Components & Containers
import "./style.css";

export default class TabLang extends Component {
  render() {
    return 
  (<div>
        <label>
          <span className="langName">Español</span>
          <Toggle 
          icons={false} />
          <span className="langName">Ingles</span>
        </label>
      </div>)
  }
}
