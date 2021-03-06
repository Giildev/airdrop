// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fundsAmount: props.fundsAmount,
      cerfiedUsersAmount: props.cerfiedUsersAmount,
      percentUser: 0,
      percentFunds: 0
    };
  }

  componentDidMount = () => {
    const { fundsAmount, cerfiedUsersAmount } = this.state;

    if (Object.keys(fundsAmount).length === 0)
      this.setState({ fundsAmount: { goal: 0, raised: 0 } });
    if (Object.keys(cerfiedUsersAmount).length === 0)
      this.setState({ cerfiedUsersAmount: { goal: 0, raised: 0 } });

    this.setState({
      percentUser: this.calculatePercent(cerfiedUsersAmount),
      percentFunds: this.calculatePercent(fundsAmount)
    });
  };

  calculatePercent = amount => (amount.raised * 100) / amount.goal;

  render() {
    const {
      percentFunds,
      percentUser,
      fundsAmount,
      cerfiedUsersAmount
    } = this.state;
    return (
      <section className="fundsRecipents">
        <h2 className="funds__title">{ this.props.titleFundsAmount }</h2>
        <div className="funds__container">
          <div className="funds__container__left">
            <img src="/fundsLeft.png" alt="" />
          </div>
          <div className="funds__container__middle">
            <div className="funds__container__middle__outerBox">
              <div className="funds__container__middle__innerBox">
                <div
                  className="funds__container__middle__innerBox__bar"
                  style={{ width: `${parseFloat(percentFunds).toFixed(2)}%` }}
                />
                <div className="containerBar">
                  <div
                    className="funds__container__middle__innerBox__bar--hidden"
                    style={{ width: `${parseFloat(percentFunds).toFixed(2)}%` }}
                  />
                  <div className="containerBar__bubble">
                    <img src="timeLine2.png" className="barTimeline" alt="" />
                    <div className="funds__container__middle__innerBox__bar__bubbleBox">
                      {fundsAmount.raised} USD Raised
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="funds__container__right">
            <img src="/fundsRight.png" alt="" />
            <h3>
              {fundsAmount.goal} USD <br /> Goal
            </h3>
          </div>
        </div>
        <h2 className="recipents__title">{ this.props.titleCertifiedFundsAmount }</h2>
        <div className="recipents__container">
          <div className="recipents__container__left">
            <img src="/recipentsLeft.png" alt="" />
          </div>
          <div className="recipents__container__middle">
            <div className="recipents__container__middle__outerBox">
              <div className="recipents__container__middle__innerBox">
                <div
                  className="recipents__container__middle__innerBox__bar"
                  style={{ width: `${parseFloat(percentUser).toFixed(2)}%` }}
                >
                  {/* <span className="barInfo">34093 Certified Users </span> */}
                </div>
                <div className="containerBar">
                  <div
                    className="recipents__container__middle__innerBox__bar--hidden"
                    style={{ width: `${parseFloat(percentUser).toFixed(2)}%` }}
                  />
                  <div className="containerBar__bubble">
                    <img src="timeLine2.png" class="barTimeline" alt="" />
                    <div className="recipents__container__middle__innerBox__bar__bubbleBox">
                      {" "}
                      {cerfiedUsersAmount.raised} Certified Users{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="recipents__container__right">
            <img src="/recipentsRight.png" alt="" />
            <h3>
              {cerfiedUsersAmount.goal} Users <br /> Goal
            </h3>
          </div>
        </div>
        <button className="fundsRecipents__buttonBox">Donate Crypto</button>
      </section>
    );
  }
}
