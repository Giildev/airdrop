// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class AdminTimeline extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lines: {}
    }
  }

  componentDidMount = () => {
    this.getTimeline();
  }

  getTimeline = () => {
    axios
      .get(`${config.BASE_URL}/timeline`)
      .then(res => this.setState({ lines: res.data.data }))
      .catch(err => console.log(err));
  }

  updateContent = (id) => {
    axios
      .put(`${config.BASE_URL}/timeline/${id}`)
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
