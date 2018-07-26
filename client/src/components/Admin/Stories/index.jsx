// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class AdminStory extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      story: {
        question: "",
        answer: "",
        lan: "",
      },
      stories: {},
      filteredStories: {},
      isOpen: false
    }
  }

  componentDidMount = () => {
    this.getStories();
  }

  getStories = () => {
    axios
      .get(`${config.BASE_URL}/story`)
      .then(res => this.setState({ stories: res.data.data }))
      .catch(err => console.log(err));
  }

  updateStory = (id) => {
    axios
      .post(`${config.BASE_URL}/story/${id}`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  createStory = () => {
    axios
      .put(`${config.BASE_URL}/story`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  
  handleStory = (e) => {
    this.setState(prevState => ({
      story: {
        ...prevState.story,
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
    const { isOpen } = this.state;
    return (
      <div>
        <button onClick={this.onShowCloseModal}>Modal</button>
        <select name="" onChange={this.handleFilterStory}>
          <option value="">All</option>
          <option value="ES">ES</option>
          <option value="EN">EN</option>
        </select>
        HTML ASI ARRECHISIMO PARA MOSTRAR LAS Stories ASI Y SU FILTRICO CHIEBRE
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
