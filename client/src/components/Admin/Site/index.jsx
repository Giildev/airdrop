// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class AdminSite extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();
    
    this.siteES = {}

    this.state = {
      contentToEdit: {},
      content: {}
    };
  }

  componentDidMount = () => {
    this.getContentData();
  };

  getContentData = () => {
    axios
      .get(`${config.BASE_URL}/site/manage/`, this.headers)
      .then(res => {
        let site = res.data.site;
        this.setState({ content: res.data.site });
      })
      .catch(err => console.log(err));
  };

  updateContent = () => {
    axios
      .post(`${config.BASE_URL}/site`, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  handleContent = e => {
    // this.setState(
    //   prevState => ({
    //     contentToEdit: {
    //       ...prevState.contentToEdit,
    //       [e.target.name]: e.target.value
    //     }
    //   }),
    //   () => console.log(this.state.contentToEdit)
    // );
  };

  render() {
    const { site } = this;
    const { content } = this.state;
    return content === {} ? (
      <Loader />
    ) : (
      <div className="tabs">
        <div className="tabs__tab">
          <input  type="radio" id="tab-1" name="tab-group-1" checked readOnly />
          <label className="content__titles--tabs" htmlFor="tab-1">Contenido español</label>
          <div className="content">
            <label className="content__titles" htmlFor="">Header Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="header.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="header.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Middle Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="middleSection.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="middleSection.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Timeline Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="timeline.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="timeline.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">About Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="about.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="about.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Story Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="story.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="story.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Mail Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="mail.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="mail.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">FAQ Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="faq.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="faq.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Contact Us Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="contactUs.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="contactUs.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Donation Section</label>
            <input
              type="text"
              placeholder="Titulo"
              name="donation.es.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Descripcion"
              name="donation.es.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <input
              type="text"
              placeholder="Warning Text"
              name="donation.es.warningText"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <input
              type="text"
              placeholder="Bottom Text"
              name="donation.es.bottomText"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <button className="saveBTN"> Save Change </button>
          </div>
        </div>

        <div className="tabs__tab">
          <input type="radio" id="tab-2" name="tab-group-1" />
          <label className="content__titles--tabs" htmlFor="tab-2">Contenido Ingles</label>
          <div className="content">
            <label className="content__titles" htmlFor="">Header Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="header.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="header.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Middle Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="middleSection.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="middleSection.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Timeline Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="timeline.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="timeline.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">About Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="about.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="about.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Story Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="story.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="story.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Mail Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="mail.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="mail.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">FAQ Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="faq.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="faq.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Contact Us Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="contactUs.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="contactUs.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <br />
            <label className="content__titles" htmlFor="">Donation Section</label>
            <input
              type="text"
              placeholder="Title ENglish"
              name="donation.en.title"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <textarea
              placeholder="Description English"
              name="donation.en.description"
              onChange={this.handleContent}
              className="formContainer__item__textarea"
            />
            <input
              type="text"
              placeholder="Warning Text"
              name="donation.en.warningText"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <input
              type="text"
              placeholder="Bottom Text"
              name="donation.en.bottomText"
              onChange={this.handleContent}
              className="formContainer__item"
            />
            <br />
            <button className="saveBTN"> Save Change </button>
            </div>
        </div>
      </div>
    );
  }
}
