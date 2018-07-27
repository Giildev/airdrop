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
        lan: "",
      },
      coverImg: "",
      stories: undefined,
      filteredStories: {},
      isOpen: false
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
      console.log(msg, id)
    }
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

  handleImage = fl => {
    let file = fl;
    file.src = URL.createObjectURL(fl.files[0]);
    console.log(file)
    console.log(file.src)
    this.setState(
      prevState => ({
        coverImg: fl.files[0],
        story: {
          ...prevState.story,
          cover: fl.files[0].name
        }
      }),
      () => {
        // this.setState({ coverPhotoTmp: file.src }, () => {
        //   this.setState({
        //     bgImage: {
        //       backgroundColor: "",
        //       backgroundImage: "url(" + this.state.coverPhotoTmp + ")", //Blob
        //       backgroundPosition: "center",
        //       backgroundRepeat: "no-repeat",
        //       backgroundSize: "contain"
        //     }
        //   });
        // });
      }
    );
  };

  uploadFile = () => {
    const data = new FormData();
    data.append("file", this.state.coverImg);
    return axios.post(`${config.baseURL}/upload/cover`, data).then(data => {
      return data;
    });
  };

  render() {
    const { isOpen, stories } = this.state;
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
            <h1 className="headerAdmin__storiesTitle">Create Stories</h1>
            <div className="form">
              <div className="col1">
                <input 
                  type="file" 
                  className="formContainer" 
                  onInputCapture={e => {
                    this.handleImage(e.target);
                  }} />
                <p className="formContainer__text">Upload Image / Video</p>
              </div>
              <div className="col2">
                <div className="formContainer">
                  <input type="text" placeholder="Title" name="title" className="formContainer__item" />
                  <input type="text" placeholder="Subtitle" name="subtitle" className="formContainer__item" />
                  <textarea name="" id="" cols="30" rows="10" name="content" className="formContainer__item__textarea" placeholder="Content" />
                </div>
              </div>
              <button className="fundsRecipents__buttonBox">Save</button>
            </div>
          </div>
        </Modal>
      </div>;
  }
}
