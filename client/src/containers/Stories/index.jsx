// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";
import { StorieCard } from "../../components/Card";

export default class Stories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       stories: props.stories
    }
  }
  
  render() {
    const { stories } = this.state;
    console.log("DATA_STORIES: ", stories);
    return (
      <section className="storiesSection" id="Stories">      
        <h2 className="storiesSection__title">Stories From Venezuelans</h2>
        <h3 className="storiesSection__subTitle">
          Read stories from Venezuelans during this crisis. Some identities are
          kept private.
        </h3>
        <div className="storiesSection__storiesContainer">
          {stories.map(story => (            
            <StorieCard 
              key={story._id}
              cover={story.cover}
              title={story.title}
              subtitle={story.subtitle}
              content={story.content}
            />     
          ))}               
        </div>

        <button className="storiesSection__button">More Stories</button>
      </section>
    );
  }
}
