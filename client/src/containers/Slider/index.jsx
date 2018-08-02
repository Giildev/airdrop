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
      index: props.index || 0
    };
  };

  shouldComponentUpdate = (nextProps) => {
    console.log(nextProps)
    if(this.state.index !== nextProps.index || this.state.stories !== nextProps.stories) {
      this.setState({ index: nextProps.index, stories: nextProps.stories })
    }
    return true;
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
          stories.map(story => <SlideCard key={story._id} story={story} />)
        }
        </Carousel>
        </div>
    );
  }
}