// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import Icons from "../../../icons.svg";
import TabLang from "../TabLang";
import { UserListCard } from "../../Card";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class AdminTimeline extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      subscribers: undefined,
    }
  }

  componentDidMount = () => {
    this.getSubscribers();
  }

  getSubscribers = () => {
    axios
      .get(`${config.BASE_URL}/subscribe`)
      .then(res => this.setState({ subscribers: res.data.subscriber }, () => {
        console.log(this.state.subscribers)
      }))
      .catch(err => {
        let error = err.response;
        if (error.status === 401) {
          alert("Unauthorized");
        } else if (error.status === 500) {
        }
      });
  }

  handleSubscribers = (msg, id) => {
    let subscribers = this.state.subscribers;

    if (msg === 'delete') {
      let newSubscribers = subscribers.filter(subscriber => subscriber._id !== id);

      this.setState({ subscribers: newSubscribers });
    }
  }

  render() {
    const { subscribers } = this.state;
    return (
      <div>
        <div className="containerStories">
          <div className="headerAdmin">
            <h1 className="headerAdmin__storiesTitle">Users</h1>
          </div>
          {
            subscribers === undefined ? <Loader /> : subscribers.map(subscriber => {
              return <UserListCard key={subscriber._id} subscriber={subscriber} handleSubscribers={this.handleSubscribers} />;
            })
          }

        </div>
      </div>
    )
  }
}
