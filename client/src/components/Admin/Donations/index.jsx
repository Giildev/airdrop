// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import Icons from "../../../icons.svg";
import { StorieCardDonation } from "../../Card";
// Components & Containers
import "./style.css";
import Loader from "../../Loader"

export default class AdminDonation extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      donation: {
        symbol: "",
        coin: "",
        icon: "",
        wallet: "",
        QR: ""
      },
      donations: undefined,
      filteredDonations: undefined,
      idDonationToUpdate: undefined,
      isOpen: false,
      newDonation: true
    }
  }

  componentDidMount = () => {
    const { history, location } = this.props
    if(this.auth.authGuard()) {
      this.getDonations();
    } else {
      history.push("/login")
    }
  }

  getDonations = () => {
    return axios
      .get(`${config.BASE_URL}/donation`, this.headers)
      .then(res => {
        console.log(res.data)
        if (res.status === 200) {
          this.setState({
            donations: res.data.data,
            filteredDonations: res.data.data
          })
        }
      })
      .catch(err => console.log(err));
  }

  updateContent = () => {
    let id = this.state.idDonationToUpdate;
    axios
      .post(`${config.BASE_URL}/donation/${id}`, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          this.setState({ donations: undefined }, () => {
            this.getFaqs().then(() => this.onShowCloseModal());
          });
        } else {
          this.getFaqs().then(() => this.onShowCloseModal());
        }
      })
      .catch(err => {
        let error = err.response;
      });
  }

  createDonation = () => {
    let body = this.state.donation;

    Object.keys(body).map(key => {
      if (body[key] === "") {
        delete body[key];
      }
    });

    axios
      .put(`${config.BASE_URL}/donation`, body, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          /**
           * Msg from server if all is correct
           */
          let donation = res.data.data;
          let donations = this.state.donations;
          this.setState({ donations: [donation, ...donations], filteredFaqs: [donation, ...donations] }, () => {
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

  handleDonation = (e) => {
    const donation = Object.assign({}, this.state.donation, { [e.target.name]: e.target.value })
    this.setState({ donation });
  }

  handleDonations = (msg, id) => {
    let donations = this.state.donations;
    if (msg === 'delete') {
      let newDonations = donations.filter(donation => donation._id !== id);

      /*
        handle class animate before delete it from state
      */
      this.setState({
        donations: newDonations
      })
    } else if (msg === 'update') {
      let donation = donations.filter(donation => donation._id === id)[0];
      this.setState({
        newDonation: false,
        idDonationToUpdate: donation._id,
        donation: {
          symbol: donation.symbol,
          coin: donation.coin,
          icon: donation.icon,
          wallet: donation.wallet,
          QR: donation.QR,
        }
      }, () => {
        this.onShowCloseModal();
      })
    }
  }

  onShowCloseModal = () => {
    const resetDonation = {
      symbol: "",
      coin: "",
      icon: "",
      wallet: "",
      QR: ""
    }

    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (!this.state.isOpen) {
        this.setState({
          newDonation: true,
          idDonationToUpdate: undefined,
          donation: resetDonation
        });
      }
    })
  }

  handleFilterDonations = (e) => {
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

  render() {
    const { isOpen, donations, donation, newDonation } = this.state;
    return (
      <div>
        <div className="containerStories">
        <div className="headerAdmin">
          <h1 className="headerAdmin__storiesTitle">Donations</h1>
          <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
            <svg className="headerAdmin__addBTN__ico">
              <use xlinkHref={`${Icons}#icon-plus`} />
            </svg>
          </button>
        </div>
        {
          donations === undefined ? <Loader /> :  donations.map(donation => {
            return <StorieCardDonation key={donation._id} donation={donation} handleDonations={this.handleDonations} />
          })
        }
        
      </div>

        
        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          <div className="containerModal">
            <h1 className="headerAdmin__storiesTitle">Add Donation</h1>
            <div className="form">
              <div className="col1">
                <label
                  className="imageUpload"
                  
                >
                  <input
                    onInputCapture={e => {
                      this.handleImage(e.target);
                    }}
                    className="imageUpload__hide"
                    type="file"
                  // style={{ backgroundColor: "red" }}
                  />
                  <svg className="imageUpload__ico">
                    <use xlinkHref={`${Icons}#icon-plus`} />
                  </svg>
                  <p className="formContainer__text">Upload Coin Icon</p>
                </label>
                <br/>
                <label
                  className="imageUpload"

                >
                  <input
                    onInputCapture={e => {
                      this.handleImage(e.target);
                    }}
                    className="imageUpload__hide"
                    type="file"
                  // style={{ backgroundColor: "red" }}
                  />
                  <svg className="imageUpload__ico">
                    <use xlinkHref={`${Icons}#icon-plus`} />
                  </svg>
                  <p className="formContainer__text">Upload QR Code</p>
                </label>
              </div>
              <div className="col2">
                <div className="formContainer">
                  <input type="text"
                  defaultValue={donation.coin}
                  onChange={this.handleDonation}
                  placeholder="Coin" className="formContainer__item" />
                  <input type="text"
                  defaultValue={donation.wallet}
                  onChange={this.handleDonation}
                  placeholder="wallet" className="formContainer__item" />
                  <input type="number"
                  defaultValue={donation.amount}
                  onChange={this.handleDonation}
                  placeholder="amount" className="formContainer__item" />
                </div>
              </div>
              {
                newDonation 
                ? (
                  <button class="fundsRecipents__buttonBox" onClick={this.createDonation}>Save</button>
                ) : (
                  <button class="fundsRecipents__buttonBox" onClick={this.updateContent}>Upload</button>
                )
              }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
