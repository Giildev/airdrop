// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";

// Components & Containers
import "./style.css";

export default class AdminSite extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: {}
    }
  }

  componentDidMount = () => {
    this.getContentData();
  }

  getContentData = () => {
    axios
      .get(`${config.BASE_URL}/site/manage/`)
      .then(res => this.setState({ content: res.data.site }))
      .catch(err => console.log(err));
  }

  updateContent = () => {
    axios
      .put(`${config.BASE_URL}/site`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  handleContent = (e) => {
    console.log(e.target.name, e.target.value);
  }

  render() {
    console.log(this.state)
    return (
      <div className="tabs">
        <div className="tabs__tab">
          <input type="radio" id="tab-1" name="tab-group-1" checked readOnly />
          <label htmlFor="tab-1">Contenido espa;ol</label>
          <div className="content">

          <label htmlFor="">Header Section</label>
          <input type="text" placeholder="Titulo" name="header.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="header.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">Middle Section</label>
          <input type="text" placeholder="Titulo" name="middleSection.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="middleSection.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">Timeline Section</label>
          <input type="text" placeholder="Titulo" name="timeline.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="timeline.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">About Section</label>
          <input type="text" placeholder="Titulo" name="about.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="about.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">Story Section</label>
          <input type="text" placeholder="Titulo" name="story.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="story.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">Mail Section</label>
          <input type="text" placeholder="Titulo" name="mail.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="mail.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">FAQ Section</label>
          <input type="text" placeholder="Titulo" name="faq.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="faq.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">Contact Us Section</label>
          <input type="text" placeholder="Titulo" name="contactUs.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="contactUs.es.description" onChange={this.handleContent} />
<br/>
          <label htmlFor="">Donation Section</label>
          <input type="text" placeholder="Titulo" name="donation.es.title" onChange={this.handleContent} />
          <input type="text" placeholder="Descripcion" name="donation.es.description" onChange={this.handleContent} />
          <input type="text" placeholder="Warning Text" name="donation.es.warningText" onChange={this.handleContent} />
          <input type="text" placeholder="Bottom Text" name="donation.es.bottomText" onChange={this.handleContent} />
            <br/>
          <button> Save Change </button>
          </div>
        </div>

        <div className="tabs__tab">
          <input type="radio" id="tab-2" name="tab-group-1" />
          <label htmlFor="tab-2">Contenido Ingles</label>
          <div className="content">

            <label htmlFor="">Header Section</label>
            <input type="text" placeholder="Title ENglish" name="header.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="header.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">Middle Section</label>
            <input type="text" placeholder="Title ENglish" name="middleSection.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="middleSection.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">Timeline Section</label>
            <input type="text" placeholder="Title ENglish" name="timeline.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="timeline.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">About Section</label>
            <input type="text" placeholder="Title ENglish" name="about.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="about.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">Story Section</label>
            <input type="text" placeholder="Title ENglish" name="story.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="story.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">Mail Section</label>
            <input type="text" placeholder="Title ENglish" name="mail.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="mail.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">FAQ Section</label>
            <input type="text" placeholder="Title ENglish" name="faq.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="faq.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">Contact Us Section</label>
            <input type="text" placeholder="Title ENglish" name="contactUs.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="contactUs.en.description" onChange={this.handleContent} />
            <br />
            <label htmlFor="">Donation Section</label>
            <input type="text" placeholder="Title ENglish" name="donation.en.title" onChange={this.handleContent} />
            <input type="text" placeholder="Description English" name="donation.en.description" onChange={this.handleContent} />
            <input type="text" placeholder="Warning Text" name="donation.en.warningText" onChange={this.handleContent} />
            <input type="text" placeholder="Bottom Text" name="donation.en.bottomText" onChange={this.handleContent} />
            <br />
          </div>
        </div>
        <button> Save Change </button>
        
      </div>
    )
  }
}
