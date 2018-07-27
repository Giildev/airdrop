// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";
import TabLang from "../../components/Admin/TabLang/";
import SideMenu from '../../components/Admin/SideMenu/';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
      <div className="containerDash">
          <SideMenu />
          <TabLang />
      </div>
      </div>
    )
  }
}
