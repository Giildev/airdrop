// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../libs/config";

// Components & Containers
import "./style.css";
import { StorieCard } from "../../components/Card";
import Loader from "../../components/Loader";
import Header from "../Header";
import Footer from "../Footer";
import Carousel from "../Slider";


export default class storieDetail extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       stories: undefined
    };
  };

  componentDidMount = () => {
    this.getStories();
  }
  
  getStories = () => {
    return axios
      .get(`${config.BASE_URL}/story`, this.headers)
      .then(res => {
        console.log(res.data.data);
        if (res.status === 200) {
          this.setState({ stories: res.data.data, filteredStories: res.data.data });
        }
      })
      .catch(err => console.log(err));
  }
  
  render() {
    const { stories } = this.state;
    return (
      <div>
        <Header />
        {
          stories === undefined 
          ? <Loader />
          : (
              <React.Fragment>
                <Carousel stories={stories}/>
                <div className="storieDetailContainer">
                  <div className="storieDetailContainer__title">More Stories</div>
                  <div className="storieDetailContainer__cardsContainer">
                  {
                    stories.map(story => <StorieCard key={story._id} story={story}/>)
                  }
                  </div>
                  <button className="storiesSection__button">More Stories</button>
                </div>
              </React.Fragment>
          )
        }
        <Footer />
      </div>
    )
  }
}
