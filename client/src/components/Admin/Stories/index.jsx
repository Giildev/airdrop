// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";

// Components & Containers
import "./style.css";
import Icons from "../../../icons.svg";
import Loader from "../../Loader";
import { StorieCardAdmin } from "../../Card";
import TabLang from "../TabLang";
export default class AdminStory extends Component {
  constructor(props) {
    super(props)

    this.form = new FormData();
    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      story: {
        title: "",
        subtitle: "",
        content: "",
        cover: "",
        lan: "ES"
      },
      coverImage: {},
      stories: undefined,
      idStoryToUpdate: undefined,
      filteredStories: {},
      isOpen: false,
      newStory: true
    }
  }

  componentDidMount = () => {
    const { history, location } = this.props
    if (this.auth.authGuard()) {
      this.getStories();
    } else {
      history.push("/login")
    }
  }

  getStories = () => {
    return axios
      .get(`${config.BASE_URL}/story`, this.headers)
      .then(res => {
        console.log(res.data.data);
        if(res.status === 200) {
          this.setState({ stories: res.data.data, filteredStories: res.data.data });
        }
      })
      .catch(err => console.log(err));
  }

  updateStory = (e) => {
    e.preventDefault();
    let id = this.state.idStoryToUpdate;
    let story = this.state.story;
    this.form.set("data", JSON.stringify(story));
    axios
      .post(`${config.BASE_URL}/story/${id}`, this.form, this.headers)
      .then(res => {
        if(res.status === 200 && res.data.success) {
          this.getStories().then(() => this.onShowCloseModal())
        }
      })
      .catch(err => console.log(err));
  }

  createStory = (e) => {
    e.preventDefault();
    let story = this.state.story;
    if(story.cover !== "") {

      Object.keys(story).map(key => {
        if (story[key] === "") {
          delete story[key];
        }
      })
      this.form.set("data", JSON.stringify(story));
      axios
        .put(`${config.BASE_URL}/story`, this.form, this.headers)
        .then(res => {
          if(res.status === 200) {
            toast(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err.response);
        });

  
    } else {
      toast('Cover empty, try again');
    }
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
      this.setState({ 
        newStory: false, 
        idStoryToUpdate: story._id,
        story: {
          title: story.title,
          subtitle: story.subtitle,
          lan: story.lan,
          content: story.content,
          cover: story.cover
        },
        coverImage: {
          backgroundColor: "",
          backgroundImage: `url("/${story.cover}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain"
        }
       }, () => {
         console.log(this.state.story)
        this.onShowCloseModal()
      })
    }
  }

  handleStory = (e) => {
    const story = Object.assign({}, this.state.story, { [e.target.name]: e.target.value })
    this.setState({ story });
  }

  clearFormData = () => {
    this.form.forEach(el => {
      console.log(el)
    });
  }
  
  onShowCloseModal = () => {
    const resetStory = {
      title: "",
      subtitle: "",
      content: "",
      cover: "",
      lan: "ES"
    }

    this.setState({ isOpen: !this.state.isOpen }, () => {
      if(!this.state.isOpen) {
        this.setState({
          newStory: true,
          idStoryToUpdate: undefined,
          story: resetStory,
          coverImage: {}
        })
      }
    })
  }

  handleLan = (lan) => {
    const story = Object.assign({}, this.state.story, { lan });
    this.setState({ story });
  }
  
  handleFilterStory = (e) => {
    let lan = e.target.value;
    let stories = this.state.filteredStories;
    let newFilteredStories = {};

    if (lan === "") {
      this.setState({ stories });
    } else {
      newFilteredStories = stories.filter(story => story.lan === lan);
      this.setState({ stories: newFilteredStories })
    }
  }

  handleImage = fl => {
    this.form.set("cover", fl.files[0]);

    const story = Object.assign({}, this.state.story, { cover: fl.files[0].name })
    fl.src = URL.createObjectURL(fl.files[0]);
    this.setState({
      coverImage: {
        backgroundColor: "",
        backgroundImage: `url("${fl.src}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
      }, story }, () => {
      console.log(this.state.story)
    });
  };

  uploadFile = (e) => {
    const body = new FormData();
    body.append("cover", this.state.coverImg);
    axios.post(`${config.BASE_URL}/upload/cover`, body, this.headers).then(res => console.log(res))
  };

  render() {
    const { isOpen, stories, newStory, story, coverImage } = this.state;
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
            <Tooltip
              title="Add Faq"
              position="right"
              size="big"
              arrow="true"
            >
              <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
                <svg className="headerAdmin__addBTN__ico">
                  <use xlinkHref={`${Icons}#icon-plus`} />
                </svg>
              </button>
            </Tooltip>
          </div>
          {stories === undefined ? <Loader /> : stories.map(story => {
              return <StorieCardAdmin key={story._id} story={story} handleStories={this.handleStories} />;
            })}
        </div>

        <Modal open={isOpen} onClose={this.onShowCloseModal} classNames={{ modal: "custom-modal" }}>
          <div className="containerModal">
          <TabLang lan={story.lan === "" ? "ES" : story.lan.toUpperCase()} handleLan={this.handleLan}/>
            <h1 className="headerAdmin__storiesTitle">Create Stories</h1>
            <div className="form">
            <div className="col1">
              <label
                className="imageUpload--single"
                style={coverImage}
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
                <p className="formContainer__text">Upload Image / Video</p>
              </label>
            </div>
              <div className="col2">
                <div className="formContainer">
                  <input type="text" placeholder="Title" name="title" defaultValue={story.title} className="formContainer__item" onChange={(e) => this.handleStory(e)}/>
                  <input type="text" placeholder="Subtitle" name="subtitle" defaultValue={story.subtitle} className="formContainer__item" onChange={(e) => this.handleStory(e)}/>
                  <textarea name="content" cols="30" rows="10" name="content" defaultValue={story.content} className="formContainer__item__textarea" placeholder="Content" onChange={(e) => this.handleStory(e)} />
                </div>
              </div>
              {
                newStory
                ? <button
                type="button"
                  className="fundsRecipents__buttonBox"
                  onClick={(event) => {
                    event.preventDefault();
                    this.createStory(event); 
                  }                
                  }
                >
                  Save</button>
                : <button
                  className="fundsRecipents__buttonBox"
                  onClick={(event) => this.updateStory(event) }
                >
                  Update</button>
              }
            </div>
          </div>
        </Modal>
      </div>;
  }
}
