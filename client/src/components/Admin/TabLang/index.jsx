// Dependencies
import React, { Component } from 'react'
import Toggle from 'react-toggle'

// Components & Containers
import "./style.css";

export default class TabLang extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lan: props.lan === 'ES' ? true : props.lan === 'EN' ? false : true // true for ES | false for EN
    }
  }

  onSwitch = (e) => {
    this.setState({ lan: !this.state.lan }, () => {
      if(this.state.lan){
        this.props.handleLan('ES')
      } else {
        this.props.handleLan('EN')
      }
    })
  }
  
  render() {
    const { lan } = this.state;
    return (<div className="langContainer">
      <label>
        <Toggle
          defaultChecked={lan}
          onChange={e => this.onSwitch(e)}
          className='flag'
          icons={false}
        />
      </label>
      {/*<h1 class="languageTitle">Select Language</h1>*/}
    </div>)        
  }
}
