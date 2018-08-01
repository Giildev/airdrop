// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import { toast } from "react-toastify";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";
import Icons from "../../../icons.svg";
export default class AdminSite extends Component {
  constructor(props) {
    super(props);

    this.contentToEdit = {};

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();
    
    this.state = {
      contentToEdit: {},
      content: undefined,
    };
  }

  componentDidMount = () => {
    const { history, location } = this.props
    if (this.auth.authGuard()) {
      this.getContentData();
    } else {
      history.push("/login")
    }
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

  updateContent = (e) => {
    e.preventDefault();
    let user = this.auth.getProfile();
    let id = user.site;

    if (Object.keys(this.contentToEdit).length > 0) {
      axios
        .post(`${config.BASE_URL}/site/manage/${id}`, this.contentToEdit, this.headers)
        .then(res => {
          if(res.status === 200) {
            console.log('object')
            toast.success('Site modified successfully');
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('else')
    }
  };

  handleContent = e => {
    this.contentToEdit[e.target.name] = e.target.value
  };

  render() {
    const { content } = this.state;
    return content === undefined ? (
      <Loader />
    ) : (
        <div>
          <div className="col1">
            <label
              className="imageUpload--banner"
            >
              <input
                onInputCapture={e => {
                  this.handleImage(e.target);
                }}
                className="imageUpload__hide"
                type="file"
              />
              <svg className="imageUpload__ico">
                <use xlinkHref={`${Icons}#icon-plus`} />
              </svg>
              <p className="formContainer__text">Upload Image for Banner</p>
            </label>
          </div>
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
                defaultValue={content.header.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="header.es.description"
                onChange={this.handleContent}
                defaultValue={content.header.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Middle Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="middleSection.es.title"
                onChange={this.handleContent}
                defaultValue={content.middleSection.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="middleSection.es.description"
                onChange={this.handleContent}
                defaultValue={content.middleSection.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Timeline Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="timeline.es.title"
                onChange={this.handleContent}
                defaultValue={content.timeline.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="timeline.es.description"
                onChange={this.handleContent}
                defaultValue={content.timeline.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">About Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="about.es.title"
                onChange={this.handleContent}
                defaultValue={content.about.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="about.es.description"
                onChange={this.handleContent}
                defaultValue={content.about.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Story Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="story.es.title"
                onChange={this.handleContent}
                defaultValue={content.story.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="story.es.description"
                onChange={this.handleContent}
                defaultValue={content.story.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Mail Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="mail.es.title"
                onChange={this.handleContent}
                defaultValue={content.mail.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="mail.es.description"
                onChange={this.handleContent}
                defaultValue={content.mail.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">FAQ Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="faq.es.title"
                onChange={this.handleContent}
                defaultValue={content.faq.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="faq.es.description"
                onChange={this.handleContent}
                defaultValue={content.faq.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Contact Us Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="contactUs.es.title"
                onChange={this.handleContent}
                defaultValue={content.contactUs.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="contactUs.es.description"
                onChange={this.handleContent}
                defaultValue={content.contactUs.es.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Donation Section</label>
              <input
                type="text"
                placeholder="Titulo"
                name="donation.es.title"
                onChange={this.handleContent}
                defaultValue={content.donation.es.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Descripcion"
                name="donation.es.description"
                onChange={this.handleContent}
                defaultValue={content.donation.es.description}
                className="formContainer__item__textarea"
              />
              <input
                type="text"
                placeholder="Warning Text"
                name="donation.es.warningText"
                onChange={this.handleContent}
                defaultValue={content.donation.es.warningText}
                className="formContainer__item"
              />
              <input
                type="text"
                placeholder="Bottom Text"
                name="donation.es.bottomText"
                onChange={this.handleContent}
                defaultValue={content.donation.es.bottomText}
                className="formContainer__item"
              />
              
            <button className="saveBTN" onClick={e => this.updateContent(e)}> Save Change </button>
            </div>
          </div>

          <div className="tabs__tab">
            <input type="radio" id="tab-2" name="tab-group-1" />
            <label className="content__titles--tabs" htmlFor="tab-2">Contenido Ingles</label>
            <div className="content">
              <label className="content__titles" htmlFor="">Header Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="header.en.title"
                onChange={this.handleContent}
                defaultValue={content.header.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="header.en.description"
                onChange={this.handleContent}
                defaultValue={content.header.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Middle Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="middleSection.en.title"
                onChange={this.handleContent}
                
                defaultValue={content.middleSection.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="middleSection.en.description"
                onChange={this.handleContent}
                defaultValue={content.middleSection.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Timeline Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="timeline.en.title"
                onChange={this.handleContent}
                defaultValue={content.timeline.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="timeline.en.description"
                onChange={this.handleContent}
                defaultValue={content.timeline.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">About Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="about.en.title"
                onChange={this.handleContent}
                defaultValue={content.about.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="about.en.description"
                onChange={this.handleContent}
                defaultValue={content.about.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Story Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="story.en.title"
                onChange={this.handleContent}
                defaultValue={content.story.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="story.en.description"
                onChange={this.handleContent}
                defaultValue={content.story.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Mail Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="mail.en.title"
                onChange={this.handleContent}
                defaultValue={content.mail.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="mail.en.description"
                onChange={this.handleContent}
                defaultValue={content.mail.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">FAQ Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="faq.en.title"
                onChange={this.handleContent}
                defaultValue={content.faq.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="faq.en.description"
                onChange={this.handleContent}
                defaultValue={content.faq.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Contact Us Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="contactUs.en.title"
                onChange={this.handleContent}
                defaultValue={content.contactUs.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="contactUs.en.description"
                onChange={this.handleContent}
                defaultValue={content.contactUs.en.description}
                className="formContainer__item__textarea"
              />
              <br />
              <label className="content__titles" htmlFor="">Donation Section</label>
              <input
                type="text"
                placeholder="Title english"
                name="donation.en.title"
                onChange={this.handleContent}
                defaultValue={content.donation.en.title}
                className="formContainer__item"
              />
              <textarea
                placeholder="Description english"
                name="donation.en.description"
                onChange={this.handleContent}
                defaultValue={content.donation.en.description}
                className="formContainer__item__textarea"
              />
              <input
                type="text"
                placeholder="Warning Text"
                name="donation.en.warningText"
                onChange={this.handleContent}
                defaultValue={content.donation.en.warningText}
                className="formContainer__item"
              />
              <input
                type="text"
                placeholder="Bottom Text"
                name="donation.en.bottomText"
                onChange={this.handleContent}
                defaultValue={content.donation.en.bottomText}
                className="formContainer__item"
              />
              <br />
              </div>
          </div>
        </div>  
      </div>
    );
  }
}
