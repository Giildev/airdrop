// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";
import { HIWCard } from "../../components/Card";

export default class HowItWorks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "How it Work's" || props.title,
      description: "Airdrop Venezuela distributes donations to help introduce Venezuelans to cryptocurrency benefits including freelance, eCommerce, investment, remittance, and other web-based opportunities." || props.description
    }
  }
  
  render() {
    const { title, description } = this.state
    return (
      <section className="howItWorks">
        <h2 className="howItWorks__title">{ `${title}` }</h2>
        <h3 className="howItWorks__subTitle">
          { `${description}` }
        </h3>
        <div className="howItWorks__cardContainer">
          <HIWCard
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
          />
        </div>
      </section>
    );
  }
}
