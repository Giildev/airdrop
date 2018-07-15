import axios from "axios";
import config from "../libs/config";

class auth {
  login(user, password) {
    let valid = this.isEmailValid(user);
    let body = { password }; // object to send, first field password
    if (valid) {
      body.email = user;
    } else {
      body.userName = user;
    }

    if (this.isLogged()) {
      this.logout();
    }

    return axios.post(`${config.BASE_URL}/auth/login`, body);
  }

  register(user) {
    return axios.post(`${config.BASE_URL}/auth/register`, user);
  }

  logout(e) {
    localStorage.removeItem("auth");
    if (
      localStorage.getItem("auth") === null ||
      localStorage.getItem("auth") === undefined
    ) {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }

  authGuard() {
    // check if auth is null or undefined
    if (
      localStorage.getItem("auth") === null ||
      localStorage.getItem("auth") === undefined
    ) {
      return false; // .auth doesn't exist
    } else {
      // check if auth is type 'string'
      if (typeof localStorage.auth === "string") {
        let session = this.decodeLocal();

        if (session !== null || session !== undefined) {
          if (session.hasOwnProperty("access_token")) {
            let token = session.access_token;
            let auth = this.isAuthenticated(token);
            if (auth) {
              return true; // Valid token
            } else {
              return false; // Invalid Token
            }
          } else {
            console.log(`Session haven't property access_token`);
            return false; // session haven't property 'access_token'
          }
        } else {
          console.log("Storage cannot be Parsed");
          return false; // localStorage cannot be Parsed
        }
      } else {
        console.log(`Isn't correct type`);
        return false; //  isn't type 'String'
      }
    }
  }

  isAuthenticated(token) {
    const header = `Bearer ${token}`;
    return axios
      .get(`${config.baseURL}/auth/verify`, {
        headers: { Authorization: header }
      })
      .then(res => {
        if (res.data.code === 200 && res.data.success) {
          return true;
        } else {
          return false;
        }
      });
  }

  buildAuthHeader() {
    const auth = this.decodeLocal();
    const header = `Bearer ${auth.access_token}`;

    return { headers: { Authorization: header } };
  }

  isJsonString(str) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return false;
    }
  }

  isEmailValid(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  decodeLocal() {
    try {
      let user = JSON.parse(localStorage.auth);
      return user;
    } catch (e) {
      return false;
    }
  }

  isLogged() {
    if (
      localStorage.getItem("auth") === null ||
      localStorage.getItem("auth") === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  getProfile() {
    let user = this.decodeLocal();
    let base64Url = user.access_token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let pl = JSON.parse(window.atob(base64));

    return pl.user;
  }
}

export default auth;
