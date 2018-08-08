// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import Icons from "../../../icons.svg";
import { CardRaisedUsers } from "../../Card";
import { CardRaised } from "../../Card";
import { toast } from "react-toastify";
// Components & Containers
import "./style.css";
import Loader from "../../Loader";

export default class AdminDonation extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      site: undefined,
      donationFundsAmount: undefined,
      donationCerfiedUsersAmount: undefined,
      objectToUpdate: {},
      funds: undefined, // true if is right FALSE if fundsUser
      isOpen: false
    };
  }

  componentDidMount = () => {
    const { history, location } = this.props;
    if (this.auth.authGuard()) {
      this.getFunds();
    } else {
      history.push("/login");
    }
  };

  getFunds = () => {
    axios
      .get(`${config.BASE_URL}/site/manage/`, this.headers)
      .then(res => {
        let data = res.data;
        if (data.success && res.status === 200) {
          this.setData(res.data.site);
        }
      })
      .catch(err => {
        let error = err.response;
        let status = err.response.status;
        if (status === 404 || status === 500 || status === 401) {
          this.auth.logout();
        }
      });
  };

  setData = data => {
    let site = data;
    let amountUsers =
      site.donationCerfiedUsersAmount === undefined
        ? { raised: 0, goal: 0 }
        : site.donationCerfiedUsersAmount;
    let amountFunds =
      site.donationFundsAmount === undefined
        ? { raised: 0, goal: 0 }
        : site.donationFundsAmount;

    this.setState({
      site,
      donationCerfiedUsersAmount: amountUsers,
      donationFundsAmount: amountFunds
    });
  };

  updateContent = () => {
    let user = this.auth.getProfile();
    let id = user.site;
    let body = this.state.objectToUpdate;

    axios
      .post(`${config.BASE_URL}/site/manage/${id}`, body, this.headers)
      .then(res => {
        let data = res.data;
        if (data.success && res.status === 200) {
          this.setData(res.data.data);
          this.onShowCloseModal();
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

  handleAmounts = msg => {
    if (msg === "userAmount") {
      this.setState({ funds: false }, () => {
        this.onShowCloseModal();
      });
    } else if (msg === "fundsAmount") {
      this.setState({ funds: true }, () => {
        this.onShowCloseModal();
      });
    }
  };

  handleFunds = e => {
    e.preventDefault();
    let amount = Object.assign({}, this.state.objectToUpdate, {
      [e.target.name]: e.target.value
    });
    this.setState({ objectToUpdate: amount });
  };

  onShowCloseModal = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (!this.state.isOpen) {
        this.setState({ objectToUpdate: {} });
      }
    });
  };

  render() {
    const {
      isOpen,
      donationCerfiedUsersAmount,
      donationFundsAmount,
      funds,
      site
    } = this.state;
    return site === undefined ? (
      <Loader />
    ) : (
      <div>
        <div className="containerStories">
          <div className="headerAdmin">
            <h1 className="headerAdmin__storiesTitle">
              Change Amount & Verified Users
            </h1>
            {/* <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
              <svg className="headerAdmin__addBTN__ico">
                <use xlinkHref={`${Icons}#icon-plus`} />
              </svg>
            </button> */}
          </div>
          <CardRaised
            amount={donationFundsAmount}
            handleAmounts={this.handleAmounts}
          />
          <CardRaisedUsers
            amount={donationCerfiedUsersAmount}
            handleAmounts={this.handleAmounts}
          />
        </div>

        <Modal
          open={isOpen}
          onClose={this.onShowCloseModal}
          classNames={{ modal: "custom-modal" }}
        >
          <div className="containerModal">
            <h1 className="headerAdmin__storiesTitle">
              Change {funds ? `Funds Amount` : `Verified Users Funds Amount`}
            </h1>
            <div className="form">
              <div className="col2">
                <div className="formContainer">
                  <input
                    type="number"
                    defaultValue={
                      funds
                        ? donationFundsAmount.raised
                        : donationCerfiedUsersAmount.raised
                    }
                    placeholder="Raised Amount"
                    name={
                      funds
                        ? `donationFundsAmount.raised`
                        : `donationCerfiedUsersAmount.raised`
                    }
                    onChange={e => this.handleFunds(e)}
                    className="formContainer__item"
                  />
                  <input
                    type="number"
                    defaultValue={
                      funds
                        ? donationFundsAmount.goal
                        : donationCerfiedUsersAmount.goal
                    }
                    placeholder="Goal Amount"
                    name={
                      funds
                        ? `donationFundsAmount.goal`
                        : `donationCerfiedUsersAmount.goal`
                    }
                    onChange={e => this.handleFunds(e)}
                    className="formContainer__item"
                  />
                </div>
              </div>
              <button
                className="fundsRecipents__buttonBox"
                onClick={this.updateContent}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
