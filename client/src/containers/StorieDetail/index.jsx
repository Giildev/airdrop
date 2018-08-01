// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";
import { StorieCard } from "../../components/Card";
import Header from "../Header";
import Footer from "../Footer";
import Carousel from "../Slider";


export default class storieDetail extends Component {
  render() {
    return (
      <div>
        <Header />
        <Carousel/>
        <div className="storieDetailContainer">
          <div className="storieDetailContainer__title">More Stories</div>
          <div className="storieDetailContainer__cardsContainer">
            <StorieCard />  
            <StorieCard />
            <StorieCard />
            <StorieCard />
          </div>
          <button className="storiesSection__button">More Stories</button>
        </div>
        <Footer />
      </div>
    )
  }
}
