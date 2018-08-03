// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";
import { CoinCard } from "../../components/Card";

export default class Donate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      description: props.description,
      warningText: props.warningText,
      bottomText: props.bottomText,
      donations: props.donations
    };
  }

  shouldComponentUpdate = (nextProps) => {
    const { title, description, warningText, bottomText } = this.state;
    if (title !== nextProps.title || 
        description !== nextProps.description || 
        warningText !== nextProps.warningText || 
        bottomText !== nextProps.bottomText) {
      this.setState({
        title: nextProps.title,
        description: nextProps.description,
        warningText: nextProps.warningText,
        bottomText: nextProps.bottomText
      });
    }
    return true;
  }

  render() {
    const { donations, title, description, warningText, bottomText } = this.state;    
    return (
      <div>
        <div className="donateContainer" id="Donate">
          <div className="donateContainer__title">
            { title }
          </div>
          <div className="donateContainer__subtitle">
            { description }
          </div>
          <div className="donateContainer__warning">
            { warningText }
          </div>
          <div className="cardsContainer">
            {donations.map(donation => (
              <CoinCard key={donation._id} donationData={donation} />
            ))}
          </div>
          <div className="donateContainer__message">
            { bottomText }
          </div>
        </div>
      </div>
    );
  }
}
