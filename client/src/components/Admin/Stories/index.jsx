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



    this.state = {
      story: {
        title: "",
        subtitle: "",
        content: "",
        cover: "",
        lan: "ES"
      },
      coverImg: "",
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
    axios
      .get(`${config.BASE_URL}/story`, this.headers)
      .then(res => {
        console.log(res.data.data);
        if(res.status === 200) {
          this.setState({ stories: res.data.data });
        }
      })
      .catch(err => console.log(err));
  }

  updateStory = (e) => {
    e.preventDefault();
    let id = this.state.idStoryToUpdate;
    axios
      .post(`${config.BASE_URL}/story/${id}`, this.state.story, this.headers)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  createStory = (e) => {
    e.preventDefault();
    console.log('create', e)
    // debugger;
    let story = this.state.story;
    if(story.cover !== "") {
      console.log('holi')
      // debugger;
    this.uploadFile()
      // console.log(res)
      // if(res.status === 200) {
      //   story = Object.assign({}, this.state.story, { cover: res.data.imgName } )
      //   this.setState({ story }, () => {
      //     let bodyStory = this.state.story

      //     Object.keys(bodyStory).map(key => {
      //       if (bodyStory[key] === "") {
      //         delete bodyStory[key];
      //       }
      //     })

      //     axios
      //       .put(`${config.BASE_URL}/story`, bodyStory, this.headers)
      //       .then(resp => {
      //         console.log(resp.data);
      //       })
      //       .catch(err => {
      //         console.log(err.response);
      //       });

      //   })
      // }

    // })
    // .catch(err => console.log(err.response))
  
    } else {
      alert('tavaciao')
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
          story: resetStory
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
    let file = fl;
    const story = Object.assign({}, this.state.story, { cover: fl.files[0].name })
    file.src = URL.createObjectURL(fl.files[0]);
    this.setState({ coverImg: fl.files[0], story });
  };

  uploadFile = (e) => {
    const body = new FormData();
    body.append("file", this.state.coverImg);
    axios.post(`${config.BASE_URL}/upload/cover`, body, this.headers).then(res => console.log(res))
  };

  render() {
    const { isOpen, stories, newStory, story } = this.state;
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
          <TabLang lan={story.lan === "" ? "ES" : story.lan.toUpperCase()} handleLan={this.handleLan}/>
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
