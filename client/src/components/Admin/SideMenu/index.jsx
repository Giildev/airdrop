// Dependencies
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService"

// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class SideMenu extends Component {
  constructor(props) {
    super(props)

    this.form = new FormData();
    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();
    this.user = this.auth.getProfile();

    this.state = {
      user: {
        avatar: ""
      },
      avatarImg: {}
    }
  }

  componentDidMount = () => {
    this.getUser();
  }

  // qrImg: {
  //   backgroundColor: "",
  //   backgroundImage: `url("/${donation.QR}")`,
  //     backgroundPosition: "center",
  //       backgroundRepeat: "no-repeat",
  //         backgroundSize: "contain"
  //     }

  getUser = () => {
    axios
    .get(`${config.BASE_URL}/user/${this.user._id}`)
    .then(res => console.log(res))
    .catch(res => console.log(res))
  }

  editUser = () => {
    let user = this.story.user
    this.form.set("data", JSON.stringify(user));
    axios
      .post(`${config.BASE_URL}/user/${this.user._id}`, this.form, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          alert('cambio')
        }
      })
      .catch(err => console.log(err));
  }

  handleImage = fl => {
    this.form.set("avatar", fl.files[0]);

    const user = Object.assign({}, this.state.user, { avatar: fl.files[0].name })
    fl.src = URL.createObjectURL(fl.files[0]);
    this.setState({
      avatarImg: {
        backgroundColor: "",
        backgroundImage: `url("${fl.src}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
      }, user
    }, () => {
      console.log(this.state.story)
    });
  };

  render() {
    return <div>
        <div className="sideContainer">
          <img src="/storie1.jpg" alt="profile" className="sideContainer__profilePic" />
          <h3 className="sideContainer__title">Admin</h3>
          <ul className="sideContainer__menu">
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard`}>Site</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/stories`}>Stories</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/donations`}>Donations</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/amount`}>Amounts Rised</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/timeline`}>TimeLine</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/faqs`}>FAQ's</Link>
            </li>
            <li className="sideContainer__menu__item">
              <Link to={`/dashboard/users`}>Users</Link>
            </li>
            <li className="sideContainer__menu__item" onClick={e => this.auth.logout(e)}>
              <a  >Log Out </a>
            </li>
          </ul>
        </div>
      </div>;
  }
}
