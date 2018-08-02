// Dependencies
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService"
import { toast } from "react-toastify";

// Components & Containers
import "./style.css";
import Icons from "../../../icons.svg";
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
    if (this.auth.authGuard()) {
      this.getUser();
    } 
  }

  getUser = () => {
    let adm = this.auth.getProfile();
    axios
    .get(`${config.BASE_URL}/user/${adm._id}`)
    .then(res => {
      if(res.status === 200 && res.data.success) {
        let data = res.data.data;
        this.setState({ 
          avatarImg: {
            backgroundColor: "",
            backgroundImage: `url("/${data.avatar}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
          }
        })
      }
    })
    .catch(res => console.log(res))
  }

  editUser = (user) => {
    let adm = this.auth.getProfile();
    // let user = this.story.user
    this.form.set("data", JSON.stringify(user));
    return axios
      .post(`${config.BASE_URL}/user/${adm._id}`, this.form, this.headers)
      .then(res => {
        console.log(res)
        if (res.status === 200 && res.data.success) {
          toast.success(`Avatar modified succesfully`)
        }
      })
      .catch(err => console.log(err));
  }

  handleImage = fl => {
    this.form.set("avatar", fl.files[0]);

    const user = Object.assign({}, this.state.user, { avatar: fl.files[0].name })
    fl.src = URL.createObjectURL(fl.files[0]);
    this.editUser(user).then(() => {
      this.setState({
        avatarImg: {
          backgroundColor: "",
          backgroundImage: `url("${fl.src}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain"
        }, user
      });
    })
    .catch(err => {
      let error = err.response;
      let status = err.response.status;
      if (status === 404 || status === 500) {
        toast.warn(error.msg)
      } else if (status === 401) this.auth.logout();
    });
  };

  render() {
    const { avatarImg } = this.state;
    return <div>
        <div className="sideContainer">
          <label
            className="imageUpload--profile"
            style={avatarImg}
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
            <p className="formContainer__text">Upload Avatar</p>
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
