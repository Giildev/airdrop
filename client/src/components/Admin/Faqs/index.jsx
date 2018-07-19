// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";

export default class AdminFaq extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
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
    console.log(e.target.name, e.target.value);
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
        <button onClick={this.onShowCloseModal}>Modal</button>
        <select name="" onChange={this.handleFilterFaq}>
          <option value="">All</option>
          <option value="ES">ES</option>
          <option value="EN">EN</option>
        </select>
        HTML ASI ARRECHISIMO PARA MOSTRAR LAS FAQS ASI Y SU FILTRICO CHIEBRE
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
