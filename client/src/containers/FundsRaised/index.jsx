// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class componentName extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fundsAmount: props.fundsAmount,
      cerfiedUsersAmount: props.cerfiedUsersAmount,
      percentUser: 0,
      percentFunds: 0
    }
  }

  componentDidMount = () => {
    const { fundsAmount, cerfiedUsersAmount } = this.state

    if(Object.keys(fundsAmount).length === 0 ) this.setState({ fundsAmount: { goal: 0, raised: 0 } })
    if(Object.keys(cerfiedUsersAmount).length === 0 ) this.setState({ cerfiedUsersAmount: { goal: 0, raised: 0 } })
    
    this.setState({
      percentUser: this.calculatePercent(fundsAmount),
      percentFunds: this.calculatePercent(cerfiedUsersAmount)
    });
  }

  calculatePercent = amount => (amount.raised * 100) / amount.goal;

  render() {
    const { percentFunds, percentUser, fundsAmount, cerfiedUsersAmount } = this.state;
    console.log(this.state)
    return (
      <section className="fundsRecipents">
        <h2 className="funds__title">Airdrop Funds Raised</h2>
        <div className="funds__container">
          <div className="funds__container__left">
            <img src="/fundsLeft.png" alt="" />
          </div>
          <div className="funds__container__middle">
            <div className="funds__container__middle__outerBox">
              <div className="funds__container__middle__innerBox">
                <div 
                  className="funds__container__middle__innerBox__bar" 
                  style={{ width: `${parseFloat(percentFunds).toFixed(2)}%`}}
                />
                <div
                  className="funds__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="34093 USD Raised"
                />
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
        <h2 className="recipents__title">Venezuelan Recipents</h2>
        <div className="recipents__container">
          <div className="recipents__container__left">
            <img src="/recipentsLeft.png" alt="" />
          </div>
          <div className="recipents__container__middle">
            <div className="recipents__container__middle__outerBox">
              <div className="recipents__container__middle__innerBox">
                <div 
                  className="recipents__container__middle__innerBox__bar" 
                  style={{ width: `${parseFloat(percentUser).toFixed(2)}%` }}/>
                <div
                  className="recipents__container__middle__innerBox__bar__bubbleBox"
                  aria-valuenow="22230 Verified Users"
                />
              </div>
            </div>
          </div>
          <div className="recipents__container__right">
            <img src="/recipentsRight.png" alt="" />
            <h3>
              {cerfiedUsersAmount.goal} USD <br /> Goal
            </h3>
          </div>
        </div>
        <button className="fundsRecipents__buttonBox">Donate Crypto</button>
      </section>
    );
  }
}
