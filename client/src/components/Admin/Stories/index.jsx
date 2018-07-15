// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class AdminStory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stories: {}
    }
  }

  componentDidMount = () => {
    this.getStories();
  }

  getStories = () => {
    axios
      .get(`${config.BASE_URL}/story`)
      .then(res => this.setState({ stories: res.data.data }))
      .catch(err => console.log(err));
  }

  updateContent = (id) => {
    axios
      .put(`${config.BASE_URL}/story/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleFaq = (e) => {
    console.log(e.target.name, e.target.value);
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
