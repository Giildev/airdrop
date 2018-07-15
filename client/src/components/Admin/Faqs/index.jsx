// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";

export default class AdminFaq extends Component {
  constructor(props) {
    super(props)

    this.state = {
      faqs: {}
    }
  }

  componentDidMount = () => {
    this.getFaqs();
  }

  getFaqs = () => {
    axios
      .get(`${config.BASE_URL}/faq`)
      .then(res => this.setState({ faqs: res.data.faqs }))
      .catch(err => console.log(err));
  }

  updateContent = (id) => {
    axios
      .put(`${config.BASE_URL}/faq/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleFaq = (e) => {
    console.log(e.target.name, e.target.value);
  }

  render() {
    console.log(this.state)
    return (
      <div>
        
      </div>
    )
  }
}
