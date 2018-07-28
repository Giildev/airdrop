// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import Icons from "../../../icons.svg";
import TabLang from "../TabLang";
import { TimeLineListCard } from "../../Card";

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
    const {isOpen}=this.state;
    return (
      <div>
        
        <h1 className="languageTitle">Select Language</h1>
        <select className="selectLang" name="" onChange={this.handleFilterStory}>
          <option  className="selectLang__item" value="">All</option>
          <option  className="selectLang__item" value="ES">ES</option>
          <option  className="selectLang__item" value="EN">EN</option>
        </select>
        <div className="containerStories">
          <div className="headerAdmin">
            <h1 className="headerAdmin__storiesTitle">Timeline</h1>
            <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
              <svg className="headerAdmin__addBTN__ico">
                <use xlinkHref={`${Icons}#icon-plus`} />
              </svg>
            </button>
          </div>
          <TimeLineListCard />
          <TimeLineListCard />
          <TimeLineListCard />
          <TimeLineListCard />

        </div>
        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
            <div className="containerModal">
            <TabLang />
            <h1 className="headerAdmin__storiesTitle">Create TimeLine</h1>
              <div className="form">
                <div className="col2">
                  <div className="formContainer">
                    <input type="text" placeholder="Title" name="title" className="formContainer__item" />
                    <textarea name="" id="" cols="30" rows="10" name="content" className="formContainer__item__textarea" placeholder="Content"></textarea>
                    <input type="date" placeholder="Start Date" name="StartDate" className="formContainer__item" />
                    <input type="date" placeholder="Finish Date" name="FinishDate" className="formContainer__item" />
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
