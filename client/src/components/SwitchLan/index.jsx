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
      lan: "es", 
      sw: true
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

  handleSw = () => {
    this.setState({ sw: !this.state.sw })
  }

  handleLanguage = () => {
    let lan = this.state.lan;

    if(lan === 'es') {
      this.setState({ lan: 'en' })
    } else {
      this.setState({ lan: 'es' })
    }
  }


  render() {
    const { content, lan, sw } = this.state;
    return content === undefined ? <Loader /> : (
      <div>
        <button onClick={this.handleSw}>cambialo ahi</button>
        {content.header[lan].title}
        {
          sw
            ? (
              <button
                type="button"
                className="fundsRecipents__buttonBox"
                onClick={e => {
                  this.hola(e)
                }}
              >hola</button>
            ) : (
              <button
                type="button"
                className="fundsRecipents__buttonBox"
                onClick={e => {
                  this.chao(e);
                }}
              >chao</button>
            )
        }
      </div>
    ) 
  }
}
