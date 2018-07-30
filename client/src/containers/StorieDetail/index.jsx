// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";
import { StorieCard } from "../../components/Card";

export default class storieDetail extends Component {
  render() {
    return (
      <div>
        <div className="storieDetailContainer">
          <div className="storieDetailContainer__main">
            <div className="storieDetailContainer__main__text">
              <h1 className="storieDetailContainer__main__text__title">Alexa Walts</h1>
              <h3 className="storieDetailContainer__main__text__subTitle">"phrase from storie"</h3>  
              <p className="storieDetailContainer__main__text__content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eos perferendis, amet ratione quisquam accusantium esse nulla reiciendis, quam nemo eligendi. Impedit quidem neque rem unde labore laboriosam soluta, quia ipsam dolor iusto quibusdam laborum dolorem necessitatibus voluptatum distinctio explicabo aspernatur architecto, placeat, veritatis quaerat. Nemo harum aliquam culpa explicabo.
              </p>
            </div>
            <div className="storieDetailContainer__main__picture">
              <img className="storieDetailContainer__main__picture__img" src="/storie1.jpg" alt=""/>
            </div>
          </div>
          <div className="storieDetailContainer__title">More Stories</div>
          <div className="storieDetailContainer__cardsContainer">
            <StorieCard />  
            <StorieCard />
            <StorieCard />
            <StorieCard />
          </div>
        </div>
        
      </div>
    )
  }
}
