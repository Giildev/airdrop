// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../libs/config";
import Auth from "../../services/authService";

// Components & Containers
import "./style.css";
import Loader from "../Loader"

export default class Switch extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      content: undefined,
      lan: "es"
    };
  }

  componentDidMount = () => {
    this.getContentData();
  };

  getContentData = () => {
    axios
      .get(`${config.BASE_URL}/site`)
      .then(res => {
        let site = res.data.site;
        this.setState({ content: res.data.site });
        // this.setState({ content: undefined });
      })
      .catch(err => console.log(err));
  };


  render() {
    const { content, lan } = this.state;
    return content === undefined ? <Loader /> : (
      <div>
        
        {content.header[lan].title}
        {/* {JSON.stringify(content.header)} */}
      </div>
    ) 
  }
}
