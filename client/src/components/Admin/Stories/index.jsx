// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import Icons from "../../../icons.svg";
import { StorieCardAdmin } from "../../Card";
import TabLang from "../TabLang";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";
export default class AdminStory extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.story = {
      title: "",
      subtitle: "",
      content: "",
      cover: "",
      lan: ""
    }

    this.state = {
      coverImg: "",
      stories: undefined,
      filteredStories: {},
      isOpen: false,
      newStory: true,
      idStoryToUpdate: undefined
    }
  }

  componentDidMount = () => {
    this.getStories();
  }

  getStories = () => {
    axios
      .get(`${config.BASE_URL}/story`, this.headers)
      .then(res => {
        console.log(res.data.data);
        this.setState({ stories: res.data.data });
      })
      .catch(err => console.log(err));
  }

  updateStory = (e) => {
    e.preventDefault();
    let id = this.state.idStoryToUpdate;
    axios
      .post(`${config.BASE_URL}/story/${id}`, this.story, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  createStory = (e) => {
    e.preventDefault();
    console.log('create')
    // if(this.story.cover !== "") {
    this.uploadFile().then(res => console.log(res))
  
    //   // axios
    //   //   .put(`${config.BASE_URL}/story`, this.story, this.headers)
    //   //   .then(res => console.log(res.data))
    //   //   .catch(err => console.log(err));
    // } else {
    //   alert('tavaciao')
    // }
  }

  handleStories = (msg, id) => {
    let stories = this.state.stories
    
    if(msg === 'delete') {
      let newStories = stories.filter(story => story._id !== id )
  
      /*
        handle class animate before delete it from state
      */
      this.setState({
        stories: newStories
      })
    } else if (msg === 'update') {
      let story = stories.filter(story => story._id === id)[0]
      console.log(story)
      this.setState({ newStory: false, idStoryToUpdate: story._id }, () => {
        this.story = {
          title: story.title,
          subtitle: story.subtitle,
          lan: story.lan,
          content: story.content
        }
        this.onShowCloseModal()
      })
    }
  }

  handleStory = (e) => {
    this.story[e.target.name] = e.target.value;
  }
  
  onShowCloseModal = () => {
    this.setState({ isOpen: !this.state.isOpen, newStory: true, idStoryToUpdate: undefined }, () => {
      this.story = {
        title: "",
        subtitle: "",
        content: "",
        cover: "",
        lan: ""
      }
    })
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

  handleImage = fl => {
    let file = fl;
    file.src = URL.createObjectURL(fl.files[0]);
    this.story.cover = fl.files[0].name;
    this.setState({ coverImg: fl.files[0] });
  };

  uploadFile = () => {
    const body = new FormData();
    body.append("file", this.state.coverImg);
    return axios.post(`${config.BASE_URL}/upload/cover`, body, this.headers).then(data => {
      // debugger;
      return data;
    });
  };

  render() {
    const { story } = this;
    const { isOpen, stories, newStory } = this.state;
    return <div>
        <h1 className="languageTitle">Select Language</h1>
        <select className="selectLang" name="" onChange={this.handleFilterStory}>
          <option className="selectLang__item" value="">
            All
          </option>
          <option className="selectLang__item" value="ES">
            ES
          </option>
          <option className="selectLang__item" value="EN">
            EN
          </option>
        </select>

        <div className="containerStories">
          <div className="headerAdmin">
            <h1 className="headerAdmin__storiesTitle">Stories</h1>
            <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
              <svg className="headerAdmin__addBTN__ico">
                <use xlinkHref={`${Icons}#icon-plus`} />
              </svg>
            </button>
          </div>
          {stories === undefined ? <Loader /> : stories.map(story => {
              return <StorieCardAdmin key={story._id} story={story} handleStories={this.handleStories} />;
            })}
        </div>

        <Modal open={isOpen} onClose={this.onShowCloseModal} classNames={{ modal: "custom-modal" }}>
          <div className="containerModal">
          <TabLang />
            <h1 className="headerAdmin__storiesTitle">Create Stories</h1>
            <div className="form">
              <div className="col1">
              <label
              className="imageUpload--single"

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
            </label>
                <p className="formContainer__text">Upload Image / Video</p>
              </div>
              <div className="col2">
                <div className="formContainer">
                  <input type="text" placeholder="Title" name="title" defaultValue={story.title} className="formContainer__item" onChange={(e) => this.handleStory(e)}/>
                  <input type="text" placeholder="Subtitle" name="subtitle" defaultValue={story.subtitle} className="formContainer__item" onChange={this.handleStory}/>
                  <textarea name="content" cols="30" rows="10" name="content" defaultValue={story.content} className="formContainer__item__textarea" placeholder="Content" onChange={this.handleStory} />
                </div>
              </div>
              <button type="submit"
                className="fundsRecipents__buttonBox"
                onClick={e => {
                  newStory === true
                    ? this.createStory(e)
                    : this.updateStory(e);
                }}
              >
              Save</button>
            </div>
          </div>
        </Modal>
      </div>;
  }
}
