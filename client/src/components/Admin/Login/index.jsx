// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";

export default class AdminLogin extends Component {
  constructor(props) {
    super(props)
    this.auth = new Auth();

    this.state = {
      isLogged: false
    }
  }

  componentDidMount = () => {
    this.login();
  }

  login = () => {
    this.auth.login('airdrop_admin', 'admin')
      .then(res => localStorage.auth = JSON.stringify(res.data.auth))
  }

  handleInput = (e) => {
    console.log(e.target.name, e.target.value);
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
