// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import { FaqCard } from "../../Card";
import Icons from "../../../icons.svg";
import TabLang from "../TabLang";

// Components & Containers
import "./style.css";
import Loader from "../../Loader";

export default class AdminFaq extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.faq = {
      question: "",
      answer: "",
      lan: "es",
    }

    this.state = {
      faqs: undefined,
      filteredFaqs: {},
      idFaqToUpdate: undefined,
      isOpen: false,
      newFaq: true
    }
  }

  componentDidMount = () => {
    this.getFaqs();
  }

  getFaqs = () => {
    axios
      .get(`${config.BASE_URL}/faq`, this.headers)
      .then(res => {
        this.setState({ faqs: res.data.faqs, filteredFaqs: res.data.faqs });
      })
      .catch(err => console.log(err));
  }

  updateFaq = (e) => {
    e.preventDefault();
    console.log("update");
    let id = this.state.idFaqToUpdate;
    console.log(id)
    // axios
    //   .post(`${config.BASE_URL}/faq/${id}`, this.faq, this.headers)
    //   .then(res => console.log(res.data))
    //   .catch(err => console.log(err));
  }

  createFaq = (e) => {
    e.preventDefault();
    console.log('create')
    axios
      .put(`${config.BASE_URL}/faq`, this.faq, this.headers)
      .then(res => {
        if(res.status === 200) {
          let faq = res.data.faq;
          let faqs = this.state.faqs;
          this.setState({ faqs: [faq, ...faqs] }, () => {
            this.onShowCloseModal();
          })
        }
      })
      .catch(err => console.log(err));
  }

  handleFaq = (e) => {
    this.faq[e.target.name] = e.target.value
    console.log(e.target.name, e.target.value);
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
      this.setState({ idFaqToUpdate: faq._id }, () => {
        console.log(this.state.newFaq)
        this.faq = {
          answer: faq.answer,
          question: faq.question,
          lan: faq.lan,
        }
        this.setState({ newFaq: false }, () => {
          this.onShowCloseModal()
        })
      })
    }
  }

  onShowCloseModal = () => {
    this.setState({ isOpen: !this.state.isOpen, newFaq: true, idFaqToUpdate: undefined }, () => {
      this.faq = {
        question: "",
        answer: "",
        lan: "es",
      }
    })
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
    const { faq } = this;
    const { isOpen, faqs, newFaq } = this.state;
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
            <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
              <svg className="headerAdmin__addBTN__ico">
                <use xlinkHref={`${Icons}#icon-plus`} />
              </svg>
            </button>
          </div>
          {
            faqs === undefined ? <Loader /> : faqs.map(faq => {
              return <FaqCard key={faq._id} faq={faq} handleFaqs={this.handleFaqs}/>;
            })
          }
          
        </div>
        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          <div className="containerModal">
            <TabLang />
            <h1 className="headerAdmin__storiesTitle">Create FAQ</h1>
            <div className="form">
              <div className="col2">
                <div className="formContainer">
                  <input type="text" placeholder="Question" defaultValue={faq.question} onChange={this.handleFaq} name="question" className="formContainer__item" />
                  <textarea name="" cols="30" rows="10" name="answer" defaultValue={faq.answer} onChange={this.handleFaq} className="formContainer__item__textarea" placeholder="Content"></textarea>
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
