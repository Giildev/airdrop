// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class AdminTimeline extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      line: {
        events: "",
        start: "",
        end: "",
        lan: "",
      },
      lines: {},
      filteredLines: {},
      isOpen: false
    }
  }

  componentDidMount = () => {
    this.getTimeline();
  }

  getTimeline = () => {
    axios
      .get(`${config.BASE_URL}/timeline`)
      .then(res => this.setState({ lines: res.data.data }))
      .catch(err => console.log(err));
  }

  updateTimeline = (id) => {
    axios
      .post(`${config.BASE_URL}/timeline/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  createTimeline = () => {
    axios
      .put(`${config.BASE_URL}/timeline`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleFaq = (e) => {
    this.setState(prevState => ({
      line: {
        ...prevState.line,
        [e.target.name]: e.target.value
      }
    }))
  }

  onShowCloseModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleFilterStory = (e) => {
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
    return (
      <div>
        <button onClick={this.onShowCloseModal}>Modal</button>
        <select name="" onChange={this.handleFilterStory}>
          <option value="">All</option>
          <option value="ES">ES</option>
          <option value="EN">EN</option>
        </select>
        HTML ASI ARRECHISIMO PARA MOSTRAR LAS Timeline ASI Y SU FILTRICO CHIEBRE
        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          HTML ASI BRUTAL PARA CREAR Y EDITAR FAQS
        </Modal>
      </div>
    )
  }
}
