// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";
import { HIWCard } from "../../components/Card";

export default class HowItWorks extends Component {
  render() {
    return (
      <section className="howItWorks">
        <div className="howItWorks__title">How it Work's</div>
        <div className="howItWorks__subTitle">
          Airdrop Venezuela distributes donations to help introduce Venezuelans
          to cryptocurrency benefits including freelance, eCommerce, investment,
          remittance, and other web-based opportunities.
        </div>
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
