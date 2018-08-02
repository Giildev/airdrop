import React, {Component} from "react";
import { SlideCard } from "../../components/Card";
import {Carousel} from "react-responsive-carousel";

import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.css";

export default class Caroussel extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
      stories: props.stories || undefined,
      index: 0
    };
  };
  
  componentDidMount = () => {

  }
  
  render() {
    const { stories, index } = this.state;
    return (
        <div>
        <Carousel 
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        stopOnHover={true}
        showIndicators={true}
        transitionTime={650}
        showThumbs={false}
        showStatus={false}
        interval={9000}
        selectedItem={index}
        >
        {
          stories.map(story => <SlideCard story={story} />)
        }
        </Carousel>
        </div>
    );
  }
}