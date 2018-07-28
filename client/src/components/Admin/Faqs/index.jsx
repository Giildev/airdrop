// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import { FaqCard } from "../../Card";
import Icons from "../../../icons.svg";
import TabLang from "../TabLang";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";

export default class AdminFaq extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      faq: {
        question: "",
        answer: "",
        lan: "",
      },
      faqs: {},
      filteredFaqs: {},
      isOpen: false
    }
  }

  componentDidMount = () => {
    this.getFaqs();
  }

  getFaqs = () => {
    axios
      .get(`${config.BASE_URL}/faq`, this.headers)
      .then(res => {
        this.setState({ faqs: res.data.faqs, filteredFaqs: res.data.faqs });
      })
      .catch(err => console.log(err));
  }

  updateFaq = (id) => {
    axios
      .post(`${config.BASE_URL}/faq/${id}`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  createFaq = () => {
    axios
      .put(`${config.BASE_URL}/faq`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleFaq = (e) => {
    this.setState(prevState => ({
      faq: {
        ...prevState.faq,
        [e.target.name]: e.target.value
      }
    }))
  }

  onShowCloseModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleFilterFaq = (e) => {
    let lan = e.target.value;
    let faqs =  this.state.filteredFaqs;
    let filteredFaqs = {};
    
    if(lan === "") {
      this.setState({ faqs: this.state.filteredFaqs });
    } else {
      filteredFaqs = faqs.filter(faq => faq.lan === lan);
      this.setState({ faqs: filteredFaqs })
    }
  }

  render() {
    const { isOpen } = this.state;
    console.log(this.state)
    return (
      <div>
        <h1 className="languageTitle">Select Language</h1>
        <select className="selectLang" name="" onChange={this.handleFilterFaq}>
          <option className="selectLang__item" value="">All</option>
          <option className="selectLang__item" value="ES">ES</option>
          <option className="selectLang__item" value="EN">EN</option>
        </select>
        <div className="containerStories">
          <div className="headerAdmin">
            <h1 className="headerAdmin__storiesTitle">Faq's</h1>
            <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
              <svg className="headerAdmin__addBTN__ico">
                <use xlinkHref={`${Icons}#icon-plus`} />
              </svg>
            </button>
          </div>
          <FaqCard />
          <FaqCard />
          <FaqCard />
          <FaqCard />
          <FaqCard />
          <FaqCard />
        </div>
        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          <div className="containerModal">
            <TabLang />
            <h1 className="headerAdmin__storiesTitle">Create FAQ</h1>
            <div className="form">
              <div className="col2">
                <div className="formContainer">
                  <input type="text" placeholder="Title" name="title" className="formContainer__item" />
                  <textarea name="" id="" cols="30" rows="10" name="content" className="formContainer__item__textarea" placeholder="Content"></textarea>
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
