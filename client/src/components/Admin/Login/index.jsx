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

  login = (e) => {
    e.preventDefault();
    const { userName, password } = this.user
    if(userName && password) {
      this.auth.login(userName, password)
        .then(res => {
          localStorage.auth = JSON.stringify(res.data.auth);
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
          <input type="text" placeholder="User or email" name="userName" onChange={this.handleInput}/>
          <input type={this.state.type} placeholder="Password" name="password" onChange={this.handleInput}/>
          <input type="button" value="Ojito pa ve la clave" onClick={this.changeTypeInput}/>
          <button type="submit"> Entrompele </button>
        </form>
       </div>
      </div>
    )
  }
}
