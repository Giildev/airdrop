// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
// Components & Containers
import "./style.css";
import Loader from "../../Loader"

export default class AdminDonation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      donations: {}
    }
  }

  componentDidMount = () => {
    this.getDonations();
  }

  getDonations = () => {
    axios
      .get(`${config.BASE_URL}/donation`)
      .then(res => this.setState({ donations: res.data.data }))
      .catch(err => console.log(err));
  }

  updateContent = (id) => {
    axios
      .put(`${config.BASE_URL}/donation/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleDonation = (e) => {
    console.log(e.target.name, e.target.value);
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
