// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";
import { HIWCard } from "../../components/Card";

export default class HowItWorks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title || "How it Work's",
      description:
        props.description ||
        "Airdrop Venezuela distributes donations to help introduce Venezuelans to cryptocurrency benefits including freelance, eCommerce, investment, remittance, and other web-based opportunities.",
      cards: props.cards
    };
  }

  shouldComponentUpdate = nextProps => {
    const { title, description, cards } = this.state;
    if (
      title !== nextProps.title ||
      description !== nextProps.description ||
      cards !== nextProps.cards
    ) {
      this.setState({
        title: nextProps.title,
        description: nextProps.description,
        cards: nextProps.cards
      });
    }
    return true;
  };

  render() {
    const { title, description, cards } = this.state;
    return (
      <section className="howItWorks" id="howItWorks">
        <h2 className="howItWorks__title">{`${title}`}</h2>
        <h3 className="howItWorks__subTitle">{`${description}`}</h3>
        <div className="howItWorks__cardContainer">
          {cards.map(card => (
            <HIWCard
              key={card._id}
              title={card.title}
              content={card.content}
              cover={card.cover}
            />
          ))}
          {/* <HIWCard
            title="Donate"
            subTitle="Share your cryptocurrency for others to benefit.
          "
          />
          <HIWCard
            title="Distribute"
            subTitle="We’ll make sure it gets to those who need it most."
          />
          <HIWCard
            title="Educate"
            subTitle="Informational content and the tools provided to use it correctly."
          /> */}
        </div>
      </section>
    );
  }
}
