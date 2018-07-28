// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import Icons from "../../../icons.svg";
import { CardRaisedUsers } from "../../Card";
import { CardRaised } from "../../Card";
// Components & Containers
import "./style.css";
import Loader from "../../Loader"

export default class AdminDonation extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      donation: {
        symbol: "",
        coin: "",
        icon: "",
        wallet: "",
      },
      donations: {},
      filteredDonations: {},
      isOpen: false
    }
  }

  componentDidMount = () => {
    this.getDonations();
  }

  getDonations = () => {
    axios
      .get(`${config.BASE_URL}/donation`)
      .then(res =>
        this.setState({
          donations: res.data.data,
          filteredDonations: res.data.data
        })
      )
      .catch(err => console.log(err));
  }

  updateContent = (id) => {
    axios
      .put(`${config.BASE_URL}/donation/${id}`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  createDonation = () => {
    axios
      .put(`${config.BASE_URL}/donation`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleDonation = (e) => {
    console.log(e.target.name, e.target.value);
  }

  onShowCloseModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleFilterDonations = (e) => {
    let lan = e.target.value;
    let faqs = this.state.filteredFaqs;
    let filteredFaqs = {};

    if (lan === "") {
      this.setState({ faqs: this.state.filteredFaqs });
    } else {
      filteredFaqs = faqs.filter(faq => faq.lan === lan);
      this.setState({ faqs: filteredFaqs })
    }
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <h1 className="languageTitle">Select Language</h1>
        <select className="selectLang" name="" onChange={this.handleFilterDonations}>
          <option className="selectLang__item" value="">All</option>
          <option className="selectLang__item" value="ES">ES</option>
          <option className="selectLang__item" value="EN">EN</option>
        </select>

        <div className="containerStories">
        <div className="headerAdmin">
          <h1 className="headerAdmin__storiesTitle">Change Amount & Verified Users</h1>
          <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
            <svg className="headerAdmin__addBTN__ico">
              <use xlinkHref={`${Icons}#icon-plus`} />
            </svg>
          </button>
        </div>
        <CardRaised />
        <CardRaisedUsers />
      </div>

        
       

        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          <div className="containerModal">
            <h1 className="headerAdmin__storiesTitle">Change Amount & Verified Users</h1>
            <div className="form">
              <div className="col2">
                <div className="formContainer">
                  <input type="number" placeholder="Funds Raised" className="formContainer__item" />
                  <input type="number" placeholder="Verified Users" className="formContainer__item" />
                </div>
              </div>
              <button class="fundsRecipents__buttonBox">Save</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
