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

    this.user = {
      userName: "",
      password: ""
    }

    this.state = {
      isLogged: false,
      type: 'password'
    }
  }

  componentWillMount = () => {
    const { history, location } = this.props
    if (this.auth.authGuard()) {
      history.push("/dashboard")
    }    
  }

  login = (e) => {
    const { history, location } = this.props;
    e.preventDefault();
    const { userName, password } = this.user
    if(userName && password) {
      this.auth.login(userName, password)
        .then(res => {
          localStorage.auth = JSON.stringify(res.data.auth);
          history.push("/dashboard")
        })
        .catch(err => {
          let error = err.response.data;
          let status = err.response.status;

          if(status === 404 || status === 500) {
            alert(error.msg);
          }
        }) 
    } else {
      alert("Empty Fields")
    }
  }

  handleInput = (e) => {
    this.user[e.target.name] = e.target.value;
  }

  changeTypeInput = (e) => {
    const { type } = this.state;
    if(type === "text") {
      this.setState({ type: "password" })
    } else {
      this.setState({ type: "text" });
    }
  }

  render() {
    return (
      <div>
       <div className="loginContainer">
        <img className="logoLogin"  src="/logo.png" alt="" />
        <form onSubmit={(e) => this.login(e)} className="formContainer">     
          <input className="formContainer__item" type="text" placeholder="User or email" name="userName" onChange={this.handleInput}/>
          <input className="formContainer__item" type={this.state.type} placeholder="Password" name="password" onChange={this.handleInput}/>
          <input type="button" value="Show Password" className="showPass" onClick={this.changeTypeInput}/>
          <button type="submit" class="fundsRecipents__buttonBox"> Login </button>
        </form>
       </div>
      </div>
    )
  }
}
