// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";
import { StorieCard } from "../../Card";

export default class AdminSite extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();
    
    this.state = {
      contentToEdit: {},
      content: {}
    };
  }

  componentDidMount = () => {
    this.getContentData();
  };

  getContentData = () => {
    axios
      .get(`${config.BASE_URL}/site/manage/`, this.headers)
      .then(res => {
        let site = res.data.site;
        this.setState({ content: res.data.site });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { content } = this.state;
    return content === {} ? (
      <Loader />
    ) : (
        <div className="containerDash__content">
          <h1 className="containerDash__content__amount">Current Status of Amount Raised</h1>
          <div className="funds__container">
            <div className="funds__container__middle">
              <div className="funds__container__middle__outerBox">
                <div className="funds__container__middle__innerBox">
                  <div className="funds__container__middle__innerBox__bar" />
                  <div
                    className="funds__container__middle__innerBox__bar__bubbleBox"
                    aria-valuenow="34093 USD Raised"
                  />
                </div>
              </div>
            </div>
          </div>
          <h1 className="containerDash__content__amount--story">Last Stories</h1>
          <div className="containerDash__content__stories">
            <StorieCard />
            <StorieCard />
            <StorieCard />
            <StorieCard />
          </div>
        </div>
    );
  }
}
