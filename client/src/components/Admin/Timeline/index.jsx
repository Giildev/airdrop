// Dependencies
import React, { Component } from 'react'
import axios from "axios";
import config from "../../../libs/config";
import Auth from "../../../services/authService";
import Modal from "react-responsive-modal";
import { TimeLineListCard } from "../../Card";
import DatePicker from "react-datetime";
import moment from 'moment';


// Components & Containers
import "./style.css";
import Icons from "../../../icons.svg";
import TabLang from "../TabLang";
import Loader from "../../Loader";
export default class AdminTimeline extends Component {
  constructor(props) {
    super(props)

    this.auth = new Auth();
    this.headers = this.auth.buildAuthHeader();

    this.state = {
      line: {
        title: "",
        event: "",
        start: "",
        end: "",
        lan: "ES",
      },
      lines: undefined,
      startDate: "",
      endDate: "",
      filteredLines: {},
      idLineToUpdate: undefined,
      isOpen: false,
      newLine: true
    }
  }

  componentDidMount = () => {
    const { history, location } = this.props
    if (this.auth.authGuard()) {
      this.getTimeline();
    } else {
      history.push("/login")
    }
  }

  getTimeline = () => {
    return axios
      .get(`${config.BASE_URL}/timeline`, this.headers)
      .then(res => this.setState({ lines: res.data.timeline, filteredLines: res.data.timeline }))
      .catch(err => console.log(err));
  }

  updateLine = () => {
    let id = this.state.idLineToUpdate;
    axios
      .post(`${config.BASE_URL}/timeline/${id}`, this.state.line, this.headers)
      .then(res => {
        console.log(res.data);
        if (res.status === 200 && res.data.success) {
          this.setState({ lines: undefined }, () => {
            this.getTimeline().then(() => this.onShowCloseModal())
          });
        } else {
          this.getTimeline().then(() => this.onShowCloseModal());
        }
      })
      .catch(err => console.log(err));
  }

  createLine = () => {
    let bodyLine = this.state.line;
    /*
     * Check if any field es equal to "" (empty) to delete 
     * and send it to back and handle empty fields from server
     */
    Object.keys(bodyLine).map(key => {
      if (bodyLine[key] === "") {
        delete bodyLine[key];
      }
    })

    axios
      .put(`${config.BASE_URL}/timeline`, bodyLine, this.headers)
      .then(res => {
        if (res.status === 200 && res.data.success) {
          /**
           * Msg from server if all is correct
           */
          let line = res.data.data;
          let lines = this.state.lines;
          this.setState({ lines: [line, ...lines], filteredLines: [line, ...lines] }, () => {
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

  handleLine = (e) => {
    const line = Object.assign({}, this.state.line, { [e.target.name]: e.target.value })
    this.setState({ line })
  }

  handleStart = (date) => {
    const line = Object.assign({}, this.state.line, { start: date.valueOf() })
    this.setState({ startDate: date, line }, () => {
      // console.log(this.state.line);
    });
  }

  handleEnd = (date) => {
    const line = Object.assign({}, this.state.line, { end: date.valueOf() })
    this.setState({ endDate: date, line }, () => {
      // console.log(this.state.line);
    });
  }

  handleLines = (msg, id) => {
    let lines = this.state.lines;
    if (msg === 'delete') {
      let newLines = lines.filter(line => line._id !== id);

      /*
        handle class animate before delete it from state
      */
      this.setState({
        lines: newLines
      })
    } else if (msg === 'update') {
      let line = lines.filter(line => line._id === id)[0];
      this.setState({
        newLine: false,
        idLineToUpdate: line._id,
        line: {
          title: line.title,
          event: line.event,
          start: moment(line.start).format("MM-DD-YYYY"),
          end: moment(line.end).format("MM-DD-YYYY"),
          lan: line.lan
        }
      }, () => {
        this.onShowCloseModal();
      })
    }
  }

  handleLan = (lan) => {
    const line = Object.assign({}, this.state.line, { lan });
    this.setState({ line });
  }

  onShowCloseModal = () => {
    const resetLine = {
      events: "",
      start: "",
      end: "",
      lan: "ES",
    }

    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (!this.state.isOpen) {
        this.setState({
          newLine: true,
          idLineToUpdate: undefined,
          line: resetLine
        });
      }
    })
  }

  handleFilterLines = (e) => {
    let lan = e.target.value;
    let lines = this.state.filteredLines;
    let filteredLines = {};

    if (lan === "") {
      this.setState({ lines: this.state.filteredLines });
    } else {
      filteredLines = lines.filter(line => line.lan === lan);
      this.setState({ lines: filteredLines });
    }
  }

  render() {
    const { isOpen, lines, newLine, line, startDate, endDate } = this.state;
    return <div>
        <h1 className="languageTitle">Select Language</h1>
        <select className="selectLang" name="" onChange={this.handleFilterLines}>
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
            <h1 className="headerAdmin__storiesTitle">Timeline</h1>
            <button className="headerAdmin__addBTN" onClick={this.onShowCloseModal}>
              <svg className="headerAdmin__addBTN__ico">
                <use xlinkHref={`${Icons}#icon-plus`} />
              </svg>
            </button>
          </div>
          {lines === undefined ? <Loader /> : lines.map(line => {
              return <TimeLineListCard key={line._id} line={line} handleLines={this.handleLines} />;
            })}
        </div>
        <Modal open={isOpen} onClose={this.onShowCloseModal} classNames={{ modal: "custom-modal" }}>
          <div className="containerModal">
          <TabLang lan={line.lan === "" ? "ES" : line.lan.toUpperCase()} handleLan={this.handleLan} />
            <h1 className="headerAdmin__storiesTitle">Create TimeLine</h1>
            <div className="form">
              <div className="col2">
                <div className="formContainer">
                  <input type="text" placeholder="Title event" name="title" 
                  onChange={this.handleLine}className="formContainer__item" defaultValue={line.title} />
                  <textarea id="" cols="30" rows="10" name="event" defaultValue={line.event}
                  onChange={this.handleLine} className="formContainer__item__textarea" placeholder="Content event" />
                  <DatePicker
                    defaultValue={line.start === "" ? moment() : line.start}
                    dateFormat="DD-MM-YYYY"
                    timeFormat={false}
                    onChange={this.handleStart}
                    className="formContainer__item__picker"
                  />
                  <DatePicker
                    defaultValue={line.end === "" ? moment() : line.end}
                    dateFormat="DD-MM-YYYY"
                    timeFormat={false}
                    onChange={this.handleEnd}
                    className="formContainer__item__picker"
                  />
                </div>
              </div>
              {newLine ? <button className="fundsRecipents__buttonBox" onClick={e => {
                    this.createLine(e);
                  }}>
                  Save
                </button> : <button className="fundsRecipents__buttonBox" onClick={e => {
                    this.updateLine(e);
                  }}>
                  Update
                </button>}
            </div>
          </div>
        </Modal>
      </div>;
  }
}
