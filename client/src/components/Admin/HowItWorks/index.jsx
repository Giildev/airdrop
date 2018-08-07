// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
import { Tooltip } from "react-tippy";

// Components & Containers
import "./style.css";
import Icons from "../../../icons.svg";
import { HIWCardAdmin } from "../../Card";
import TabLang from "../TabLang";
import Loader from "../../Loader";

export default class HowItWorks extends Component {
  constructor(props) {
    super(props);

    this.form = new FormData();
    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      card: {
        title: "",
        content: "",
        cover: "",
        lan: "ES"
      },
      coverImg: {},
      cards: undefined,
      filteredCards: undefined,
      idCardToUpdate: undefined,
      isOpen: false,
      newCard: true
    };
  }

  componentDidMount = () => {
    const { history, location } = this.props;
    if (this.auth.authGuard()) {
      this.getCards();
    } else {
      history.push("/login");
    }
  };

  getCards = () => {
    return axios
      .get(`${config.BASE_URL}/hiwcard`, this.headers)
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          this.setState({
            cards: res.data.hiwcards,
            filteredCards: res.data.hiwcards
          });
        }
      })
      .catch(err => {
        let error = err.response;
        let status = err.response.status;
        if (status === 404 || status === 500) {
          toast.warn(error.msg)
        } else if (status === 401) this.auth.logout(); 
      });
  };

  updateContent = () => {
    let id = this.state.idCardToUpdate;
    let card = this.state.card;

    this.form.set("data", JSON.stringify(card));

    axios
      .post(`${config.BASE_URL}/hiwcard/${id}`, this.form, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          this.setState({ cards: undefined }, () => {
            toast.success(res.data.msg);
            this.getCards().then(() => this.onShowCloseModal());
          });
        } else {
          this.getCards().then(() => this.onShowCloseModal());
        }
      })
      .catch(err => {
        let error = err.response;
        let status = err.response.status;
        if (status === 404 || status === 500) {
          toast.warn(error.msg);
        } else if (status === 401) this.auth.logout();
      });
  };

  createCard = () => {
    let card = this.state.card;
    console.log('card', card)
    Object.keys(card).map(key => {
      if (card[key] === "") {
        delete card[key];
      }
    });

    this.form.set("data", JSON.stringify(card));
    axios
      .put(`${config.BASE_URL}/hiwcard`, this.form, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          /**
           * Msg from server if all is correct
           */
          let card = res.data.hiwcard;
          let cards = this.state.cards;
          this.setState(
            {
              cards: [card, ...cards],
              filteredCards: [card, ...cards]
            },
            () => {
              this.onShowCloseModal();
            }
          );
        } else if (res.status === 200 && !res.data.success) {
          /**
           * Msg from server if left any field in object
           */
          alert(res.data.msg);
        }
      })
      .catch(err => {
        let error = err.response;
        let status = err.response.status;
        if (status === 404 || status === 500) {
          toast.warn(error.msg);
        } else if (status === 401) this.auth.logout();
      });
  };

  handleCard = e => {
    const card = Object.assign({}, this.state.card, {
      [e.target.name]: e.target.value
    });
    this.setState({ card });
  };

  handleCards = (msg, id) => {
    let cards = this.state.cards;
    if (msg === "delete") {
      let newCards = cards.filter(card => card._id !== id);

      /*
        handle class animate before delete it from state
      */
      this.setState({
        cards: newCards
      });
    } else if (msg === "update") {
      let card = cards.filter(card => card._id === id)[0];
      this.setState(
        {
          newCard: false,
          idCardToUpdate: card._id,
          card: {
            title: card.title,
            content: card.content,
            cover: card.cover,
            lan: card.lan
          },
          coverImg: {
            backgroundColor: "",
            backgroundImage: `url("/${card.cover}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
          },
        },
        () => {
          this.onShowCloseModal();
        }
      );
    }
  };

  onShowCloseModal = () => {
    const resetCard = {
      title: "",
      content: "",
      cover: "",
      lan: "ES"
    };

    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (!this.state.isOpen) {
        this.setState({
          newCard: true,
          idCardToUpdate: undefined,
          card: resetCard,
          coverImg: {},
        });
      }
    });
  };

  handleImageCover = fl => {
    this.form.set("cover", fl.files[0]);

    const card = Object.assign({}, this.state.card, {
      cover: fl.files[0].name
    });
    fl.src = URL.createObjectURL(fl.files[0]);
    this.setState({
      card,
      coverImg: {
        backgroundColor: "",
        backgroundImage: `url("${fl.src}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain"
      }
    });
  };

  handleLan = (lan) => {
    const card = Object.assign({}, this.state.card, { lan });
    this.setState({ card });
  }

  handleFilterCards = e => {
    let lan = e.target.value;
    let cards = this.state.filteredCards;
    let filteredCards = {};

    if (lan === "") {
      this.setState({ cards: this.state.filteredCards });
    } else {
      filteredCards = cards.filter(card => card.lan === lan);
      this.setState({ cards: filteredCards });
    }
  };

  render() {
    const {
      isOpen,
      cards,
      card,
      newCard,
      coverImg,
    } = this.state;
    return (
      <div>
        <h1 className="languageTitle">Select Language</h1>
        <select className="selectLang" name="" onChange={this.handleFilterCards}>
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
            <h1 className="headerAdmin__storiesTitle">How it works cards</h1>
            <Tooltip
              title="Add HIW Card"
              position="right"
              size="big"
              arrow="true"
            >
              <button
                className="headerAdmin__addBTN"
                onClick={this.onShowCloseModal}
              >
                <svg className="headerAdmin__addBTN__ico">
                  <use xlinkHref={`${Icons}#icon-plus`} />
                </svg>
              </button>
            </Tooltip>
          </div>
          {cards === undefined ? (
            <Loader />
          ) : (
            cards.map(card => {
              return (
                <HIWCardAdmin
                  key={card._id}
                  card={card}
                  handleCards={this.handleCards}
                />
              );
            })
          )}
        </div>

        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          <div className="containerModal">
            <TabLang lan={card.lan === "" ? "ES" : card.lan.toUpperCase()} handleLan={this.handleLan} />
            <h1 className="headerAdmin__storiesTitle">
              Create How it Works Card
            </h1>
            <div className="form">
              <div className="col1">
                <label className="imageUpload" style={coverImg}>
                  <input
                    onInputCapture={e => {
                      this.handleImageCover(e.target);
                    }}
                    className="imageUpload__hide"
                    type="file"
                    // style={{ backgroundColor: "red" }}
                  />
                  <svg className="imageUpload__ico">
                    <use xlinkHref={`${Icons}#icon-plus`} />
                  </svg>
                  <p className="formContainer__text">Upload Card Img</p>
                </label>
                <br />
              </div>
              <div className="col2">
                <div className="formContainer">
                  
                  <input
                    type="text"
                    name="title"
                    defaultValue={card.title}
                    onChange={this.handleCard}
                    placeholder="Title"
                    className="formContainer__item"
                  />
                  <input
                    type="text"
                    name="content"
                    defaultValue={card.content}
                    onChange={this.handleCard}
                    placeholder="Content"
                    className="formContainer__item"
                  />
               
                </div>
              </div>
              {newCard ? (
                <button
                  className="fundsRecipents__buttonBox"
                  onClick={e => this.createCard(e)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="fundsRecipents__buttonBox"
                  onClick={e => this.updateContent(e)}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
