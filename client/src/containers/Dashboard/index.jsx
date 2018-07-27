// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";
//import TabLang from "../../components/Admin/TabLang/";
import SideMenu from '../../components/Admin/SideMenu/';
import AdminStory from '../../components/Admin/Stories/';
import { StorieCard } from "../../components/Card";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
      <div className="containerDash">
          <SideMenu />
          <div className="containerDash__content">
            <h1 className="containerDash__content__amount">Current Status of Amount Raised</h1>
            <div className="funds__container">
              <div className="funds__container__middle">
                <div className="funds__container__middle__outerBox">
                  <div className="funds__container__middle__innerBox">
                    <div className="funds__container__middle__innerBox__bar" />
                    <div
                      className="funds__container__middle__innerBox__bar__bubbleBox"
                      aria-valuenow="34093 USD Raised"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h1 className="containerDash__content__amount--story">Last Stories</h1>
            <div className="containerDash__content__stories">
              <StorieCard />
              <StorieCard />
              <StorieCard />
              <StorieCard />
            </div> 
            <AdminStory />
          </div>
          
      </div>
      </div>
    )
  }
}
