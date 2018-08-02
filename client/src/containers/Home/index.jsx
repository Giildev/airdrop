// Dependencies
import React, { Component } from "react";
import axios from "axios";
import config from "../../libs/config";

// Components
import Header from "../Header";
import Banner from "../Banner";
import HowItWorks from "../HowItWorks";
import FundsRaised from "../FundsRaised";
import Quote from "../Quote";
import TimeLine from "../Timeline";
import Donate from "../Donate";
import MailList from "../MailList";
import Faq from "../Faq";
import Footer from "../Footer";
import Contact from "../Contact";
import Stories from "../Stories";

// Styles
import "./style.css";
import "react-tippy/dist/tippy.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "",
      selectedLan: "en", // handle selected before change content with State.lan
      content: undefined
    };
  }

  componentDidMount = () => {
    this.getContentData();
  };

  getContentData = () => {
    axios.get(`${config.BASE_URL}/site/${this.state.selectedLan}`).then(res => {
      console.log("DATA_CONTENT: ", res.data.site);      
      this.setState({ content: res.data.site, lan: this.state.selectedLan });
    }); // fix
  };

  handleLanguage = e => {
    this.setState({ selectedLan: e.target });
  };

  render() {
    const { content, selectedLan } = this.state;
    console.log(content);
    return content === undefined ? (
      <Loader />
    ) : (
      <div>
        <Header />
        <Banner
          image={content.banner}
          title={content.header[selectedLan].title}
          description={content.header[selectedLan].description}
        />
        <HowItWorks
          title={content.middleSection[selectedLan].title}
          description={content.middleSection[selectedLan].description}
        />
        <FundsRaised
          fundsAmount={content.donationFundsAmount}
          cerfiedUsersAmount={content.donationCerfiedUsersAmount}
        />
        <Quote />
        <TimeLine />
        <Stories 
          title={content.story[selectedLan].title}
          description={content.story[selectedLan].description}
          stories={content.stories}
        />
        <Donate />
        <MailList
          title={content.mail[selectedLan].title}
          description={content.mail[selectedLan].description}
        />
        <Faq
          title={content.faq[selectedLan].title}
          description={content.faq[selectedLan].description}
          faqs={content.faqs}
        />
        <Contact />
        <Footer />
      </div>
    );
  }
}
