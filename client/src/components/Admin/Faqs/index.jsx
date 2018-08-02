// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import { FaqCard } from "../../Card";
import { Tooltip } from "react-tippy";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";
import Icons from "../../../icons.svg";
import TabLang from "../TabLang";

export default class AdminFaq extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      faq: {
        question: "",
        answer: "",
        lan: "ES",
      },
      faqs: undefined,
      filteredFaqs: {},
      idFaqToUpdate: undefined,
      isOpen: false,
      newFaq: true
    }
  }

  componentDidMount = () => {
    const { history, location } = this.props
    if (this.auth.authGuard()) {
      this.getFaqs();
    } else {
      history.push("/login")
    }
  }

  getFaqs = () => {
    return axios
      .get(`${config.BASE_URL}/faq`, this.headers)
      .then(res => {
        if(res.status === 200) { 
          this.setState({ faqs: res.data.faqs, filteredFaqs: res.data.faqs });
        }
      })
      .catch(err => console.log(err));
  }

  updateFaq = (e) => {
    let id = this.state.idFaqToUpdate;
    axios
      .post(`${config.BASE_URL}/faq/${id}`, this.state.faq, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          this.setState({ faqs: undefined }, () => {
            this.getFaqs().then(() => this.onShowCloseModal())
          });
        } else {
          this.getFaqs().then(() => this.onShowCloseModal());
        }
      })
      .catch(err => {
        let error = err.response;
      });
  }

  createFaq = (e) => {
    let bodyFaq =  this.state.faq;
    /**
     * Check if any field es equal to "" (empty) to delete 
     * and send it to back and handle empty fields from server
     */
    Object.keys(bodyFaq).map(key => {
      if (bodyFaq[key] === "") {
        delete bodyFaq[key];
      }
    })
    axios
      .put(`${config.BASE_URL}/faq`, bodyFaq, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          /**
           * Msg from server if all is correct
           */
          let faq = res.data.faq;
          let faqs = this.state.faqs;
          this.setState({ faqs: [faq, ...faqs], filteredFaqs:[faq, ...faqs]}, () => {
            this.onShowCloseModal();
          });
        } else if (res.status === 200 && !res.data.success) {
          /**
           * Msg from server if left any field in object
           */
          alert(res.data.msg);
        }
      })
      .catch(err => console.log(err));
  }

  handleFaq = (e) => {
    // this.faq[e.target.name] = e.target.value
    const faq = Object.assign({}, this.state.faq, { [e.target.name]: e.target.value })
    this.setState({ faq })
  }

  handleFaqs = (msg, id) => {
    let faqs = this.state.faqs;
    if(msg === 'delete') { 
      let newFaqs = faqs.filter(faq => faq._id !== id);

      /*
        handle class animate before delete it from state
      */
      this.setState({
        faqs: newFaqs
      })
    } else if (msg === 'update') {
      let faq = faqs.filter(faq => faq._id === id)[0];
      this.setState({ 
        newFaq: false, 
        idFaqToUpdate: faq._id, 
        faq: {
          question: faq.question,
          answer: faq.answer,
          lan: faq.lan
        }
      }, () => {        
        this.onShowCloseModal();
      })
    }
  }

  onShowCloseModal = () => {
    const resetFaq = {
      question: "",
      answer: "",
      lan: "ES",
    }

    this.setState({ isOpen: !this.state.isOpen }, () => {
      if(!this.state.isOpen) {
          this.setState({
            newFaq: true,
            idFaqToUpdate: undefined,
            faq: resetFaq
          });
        }
    })
  }

  handleLan = (lan) => {
    const faq = Object.assign({}, this.state.faq, { lan })
    this.setState({ faq })
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
    const { isOpen, faqs, newFaq, faq } = this.state;
    return (
      <div>
        <h1 className="languageTitle">Select Language</h1>
        <select className="selectLang" name="" onChange={this.handleFilterFaq}>
          <option className="selectLang__item" value="">All</option>
          <option className="selectLang__item" value="ES">ES</option>
          <option className="selectLang__item" value="EN">EN</option>
        </select>
        <div className="containerStories">
          <div className="headerAdmin">
            <h1 className="headerAdmin__storiesTitle">Faq's</h1>
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
          {
            faqs === undefined ? <Loader /> : faqs.map(faq => {
              return <FaqCard key={faq._id} faq={faq} handleFaqs={this.handleFaqs} />;
            })
          }
          
        </div>
        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          <div className="containerModal">
            <TabLang lan={faq.lan === "" ? "ES" : faq.lan.toUpperCase()} handleLan={this.handleLan}/>
            <h1 className="headerAdmin__storiesTitle">Create FAQ</h1>
            <div className="form">
              <div className="col2">
                <div className="formContainer">
                  <input type="text" placeholder="Question" defaultValue={faq.question} onChange={this.handleFaq} name="question" className="formContainer__item" />
                  <textarea cols="30" rows="10" name="answer" defaultValue={faq.answer} onChange={this.handleFaq} className="formContainer__item__textarea" placeholder="Answer"></textarea>
                </div>
              </div>
              {
                newFaq 
                ? (
                  <button
                    type="button"
                    className="fundsRecipents__buttonBox"
                    onClick={e => {
                      this.createFaq(e)
                    }}
                  >Save</button>
                ) : (
                    <button
                      type="button"
                      className="fundsRecipents__buttonBox"
                      onClick={e => {
                        this.updateFaq(e);
                      }}
                    >Update</button>
                )
              }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
