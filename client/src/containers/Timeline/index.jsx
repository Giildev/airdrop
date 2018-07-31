// Dependencies
import React, { Component } from 'react'

// Components & Containers
import "./style.css";
import {TimeLineCard} from "../../components/Card";

export default class TimeLine extends Component {
  render() {
    return (
      <div>
      <div className="timeLineContainer">
        <h1 className="timeTitle">AirDrop 2018 Timeline</h1>
        <div className="cardRow">
          <div className="ColTimeCards--up">
            <TimeLineCard />
              <div className="containerDate">
                <div className="containerDate__group">
                  <img src="timeLine2.png" alt=""/>
                  <p className="containerDate__group__date">7/16/2018</p>
                </div>
                <div className="containerDate__group">
                  <img src="timeLine2.png" alt=""/>
                  <p className="containerDate__group__date">7/16/2018</p>
                </div>
              </div>
          </div>
          <div className="ColTimeCards--down">
              <div className="containerDate">
                <div className="containerDate__group">
                  <p className="containerDate__group__date">7/16/2018</p>
                  <img src="timeLine.png" alt=""/>
                </div>
                <div className="containerDate__group">
                  <p className="containerDate__group__date">7/16/2018</p>
                  <img src="timeLine.png" alt=""/>
                </div>
              </div>
            <TimeLineCard />
          </div>
          <div className="ColTimeCards--up">
            <TimeLineCard />
              <div className="containerDate">
                <div className="containerDate__group">
                  <img src="timeLine2.png" alt=""/>
                  <p className="containerDate__group__date">7/16/2018</p>
                </div>
                <div className="containerDate__group">
                  <img src="timeLine2.png" alt=""/>
                  <p className="containerDate__group__date">7/16/2018</p>
                </div>
              </div>
          </div>
          <div className="ColTimeCards--down">
              <div className="containerDate">
                <div className="containerDate__group">
                  <p className="containerDate__group__date">7/16/2018</p>
                  <img src="timeLine.png" alt=""/>
                </div>
                <div className="containerDate__group">
                  <p className="containerDate__group__date">7/16/2018</p>
                  <img src="timeLine.png" alt=""/>
                </div>
              </div>
            <TimeLineCard />
          </div>
        </div>
      </div>
        
      </div>
    )
  }
}
