// Dependencies
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService"
import Icons from "../../../icons.svg";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class SideMenu extends Component {
  constructor(props) {
    super(props)

    this.form = new FormData();
    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();
    

    this.state = {
      user: {
        avatar: ""
      },
      avatarImg: {}
    }
  }

  componentDidMount = () => {
    const { history, location } = this.props
    
    if (this.auth.authGuard()) {
      this.getUser();
    } 
  }

  // qrImg: {
  //   backgroundColor: "",
  //   backgroundImage: `url("/${donation.QR}")`,
  //     backgroundPosition: "center",
  //       backgroundRepeat: "no-repeat",
  //         backgroundSize: "contain"
  //     }

  getUser = () => {
    let adm = this.auth.getProfile();
    axios
    .get(`${config.BASE_URL}/user/${adm._id}`)
    .then(res => console.log(res))
    .catch(res => console.log(res))
  }

  editUser = () => {
    let adm = this.auth.getProfile();
    let user = this.story.user
    this.form.set("data", JSON.stringify(user));
    axios
      .post(`${config.BASE_URL}/user/${adm._id}`, this.form, this.headers)
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
    });
  };

  render() {
    return <div>
        <div className="sideContainer">
          <label
            className="imageUpload--profile"
          >
            <input
              onInputCapture={e => {
                this.handleImage(e.target);
              }}
              className="imageUpload__hide"
              type="file"
            />
            <svg className="imageUpload__ico">
              <use xlinkHref={`${Icons}#icon-plus`} />
            </svg>
            <p className="formContainer__text">Upload Image / Video</p>
          </label>  
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
