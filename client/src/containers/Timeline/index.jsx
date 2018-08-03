// Dependencies
import React, { Component } from "react";
import moment from "moment";

// Components & Containers
import "./style.css";
import { TimeLineCard } from "../../components/Card";

export default class TimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      description: props.description,
      timeline: props.timeline
    };
  }

  shouldComponentUpdate = (nextProps) => {
    const { title, description } = this.state;
    if (title !== nextProps.title || description !== nextProps.description) {
      this.setState({
        title: nextProps.title,
        description: nextProps.description
      })
    }
    return true;
  }

  render() {
    const { title, description, timeline } = this.state;    
    // let evenValues = [];
    // let oddValues = [];
    // for (let i = 0; i < data.length; i++) {
    //   if (i % 2 === 0) {
    //     evenValues.push(data[i]);
    //   } else {
    //     oddValues.push(data[i]);
    //   }
    // }
    // console.log("EVEN_VALUES: ", evenValues);
    // console.log("ODD_VALUES: ", oddValues);
    return (
      <div>
        <div className="timeLineContainer">
          <h1 className="timeTitle">{title}</h1>
          <div className="cardRow">
            {timeline.lines.map((timeL, i) => 
                i % 2 === 0 ? (
                  <div key={i} className="ColTimeCards--up">
                    <TimeLineCard 
                      key={i}
                      timeline={timeL}
                    />
                    <div className="containerDate">
                      <div className="containerDate__group">
                        <img src="timeLine2.png" alt="" />
                        <p className="containerDate__group__date">{ moment(timeL.start).format("MM/DD/YYYY") }</p>
                      </div>
                      <div className="containerDate__group">
                        <img src="timeLine2.png" alt="" />
                        <p className="containerDate__group__date">{ moment(timeL.end).format("MM/DD/YYYY") }</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="ColTimeCards--down">
                  <div className="containerDate">
                    <div className="containerDate__group">
                      <p className="containerDate__group__date">{ moment(timeL.start).format("MM/DD/YYYY") }</p>
                      <img src="timeLine.png" alt="" />
                    </div>
                    <div className="containerDate__group">
                      <p className="containerDate__group__date">{ moment(timeL.end).format("MM/DD/YYYY") }</p>
                      <img src="timeLine.png" alt="" />
                    </div>
                  </div>
                  <TimeLineCard
                    key={i}
                    timeline={timeL}
                   />
                </div>                  
                )
            )}
          </div>
        </div>
      </div>
    );
  }
}
