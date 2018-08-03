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
      stories: undefined,
      filteredStories: undefined,
      index: 0,
      selectedLan: props.lan || "EN"
    };
  };

  componentDidMount = () => {
    const { location } = this.props
    this.getStories().then(() => {      
      const stories = this.state.filteredStories;      
      if(location.state !== undefined) {
        stories.map((story, i) => {
          if (story._id === location.state.sid) {
            this.setState({ index: i })
          }
        })
      }

      
    })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const { location } = this.props
    const { selectedLan } = this.state
    if(location.hash !== nextProps.location.hash) {
      let title = nextProps.location.hash;
      title = title.slice(1).split("-").join(" ").toLowerCase();

      const stories = this.state.filteredStories;
      stories.map((story, i) => {
        if (story.title.toLowerCase() === title) {
          this.setState({ index: i }, () => {
            this.scrollTop();
          })
        }
      })
    }
    return true;
  };

  getStories = () => {
    return axios
      .get(`${config.BASE_URL}/story`, this.headers)
      .then(res => {
        if (res.status === 200) {
          this.setState({ stories: res.data.data, filteredStories: this.handleStories(res.data.data) });
        }
      })
      .catch(err => console.log(err));
  }

  handleStories = (stories = this.state.stories) => {
    const { selectedLan } = this.state
    return stories.filter(story => story.lan === selectedLan);
  }

  scrollTop = () => {
    document.body.scrollTop = 0; // for safari
    document.documentElement.scrollTop = 0; // for the rest of browsers
  }

  handleLanguage = lan => {
    this.setState({ selectedLan: lan.toUpperCase() }, () => {
      this.setState({ filteredStories: this.handleStories() })
    });
  };
  
  render() {
    const { index, filteredStories } = this.state;
    const stories = filteredStories; 
    return (
      <div>
        <Header handleLanguage={this.handleLanguage} />
        {
          stories === undefined 
          ? <Loader />
          : (
            <React.Fragment>
              <Carousel stories={stories} index={index}/>
              <div className="storieDetailContainer">
                <div className="storieDetailContainer__title">More Stories</div>
                <div className="storieDetailContainer__cardsContainer">
                {
                  // stories.map(story => <StorieCard key={story._id} story={story} />)
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
