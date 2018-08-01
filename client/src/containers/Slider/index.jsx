import React, {Component} from "react";
import { SlideCard } from "../../components/Card";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class Caroussel extends Component{
  render() {

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
        >
          <SlideCard/>
          <SlideCard/>
          <SlideCard/>
        </Carousel>
        </div>
    );
  }
}