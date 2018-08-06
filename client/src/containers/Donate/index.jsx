// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";
import { CoinCard } from "../../components/Card";

export default class Donate extends Component {
  constructor(props) {
    super(props);
    console.log("donation", props);
    this.state = {
      title: props.title,
      description: props.description,
      warningText: props.warningText,
      bottomText: props.bottomText,
      donations: props.donations
    };
  }

  shouldComponentUpdate = nextProps => {
    const {
      title,
      description,
      warningText,
      bottomText,
      donations
    } = this.state;
    if (
      title !== nextProps.title ||
      description !== nextProps.description ||
      warningText !== nextProps.warningText ||
      bottomText !== nextProps.bottomText ||
      donations !== nextProps.donations
    ) {
      this.setState({
        title: nextProps.title,
        description: nextProps.description,
        donations: nextProps.donations,
        warningText: nextProps.warningText,
        bottomText: nextProps.bottomText
      });
    }
    return true;
  };

  render() {
    const {
      title,
      description,
      warningText,
      bottomText,
      donations
    } = this.state;
    return (
      <div>
        <div className="donateContainer" id="Donate">
          <div className="donateContainer__title">{title}</div>
          <div className="donateContainer__subtitle">{description}</div>
          <div className="donateContainer__warning">{warningText}</div>
          <div className="cardsContainer">
            {donations.map(donation => (
              <CoinCard key={donation._id} donationData={donation} />
            ))}
          </div>
          <div className="donateContainer__message">{bottomText}</div>
        </div>
      </div>
    );
  }
}
