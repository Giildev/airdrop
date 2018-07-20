// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../libs/config";
// Components
import Header from "../Header";
import Banner from "../Banner";
import HowItWorks from "../HowItWorks";
import FundsRaised from "../FundsRaised";
import Quote from "../Quote";
import TimeLine from "../Timeline";
import Footer from "../Footer";
import Contact from "../Contact";
import Stories from "../Stories";
import AdminSite from "../../components/Admin/Site";

// Styles
import "./style.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "",
      selectedLan: "es", // handle selected before change content with State.lan
      content: {}
    };
  }

  componentDidMount = () => {
    this.getContentData();
  };

  getContentData = () => {
    axios
      .get(`${config.BASE_URL}/site/${this.state.selectedLan}`)
      .then(res =>
        this.setState({ content: res.data.site, lan: this.state.selectedLan })
      ); // fix
  };

  handleLanguage = e => {
    this.setState({ selectedLan: e.target });
  };

  render() {
    return (
      <div>
        <Header />
        <Banner />
        <HowItWorks />
        <FundsRaised />
        <Quote />
        <TimeLine />
        <Stories />
        <Contact />
        <Footer />
        {/*<h1>
          ANDO VIENDO COMO ES LA VAINA CON LOS TABS PARA EL ADMIN SI TIENES UN
          MEJOR CSS FUEGO XD
        </h1>
        <AdminSite />*/}
      </div>
    );
  }
}
