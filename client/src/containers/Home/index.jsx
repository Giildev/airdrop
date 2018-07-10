// Dependencies
import React, { Component } from "react";

// Components & Containers
import "./style.css";

export default class Home extends Component {
  donationHandler = params => {
    params.preventDefault();
    console.log(params.target);
  };

  storyHandler = params => {
    params.preventDefault();
    console.log(params.target);
  };

  donationList = () => {
    let data = [
      { name: "btc" },
      { name: "eth" },
      { name: "xrp" },
      { name: "bch" }
    ];

    return data.map(e => {
      return <li>{e.name}</li>;
    });
  };

  storyList = () => {
    let data = [
      { name: "story 1" },
      { name: "story 2" },
      { name: "story 3" },
      { name: "story 4" }
    ];

    return data.map(e => {
      return <li>{e.name}</li>;
    });
  };

  faqList = () => {
    let data = [
      { q: "q 1", a: "a 1" },
      { q: "q 2", a: "a 2" },
      { q: "q 3", a: "a 3" },
      { q: "q 4", a: "a 4" }
    ];

    return data.map(e => {
      return (
        <ul>
          <li>{e.q}</li>
          <li>{e.a}</li>
        </ul>
      );
    });
  };

  render() {
    return (
      <div>
        <h1>Donation</h1>
        <form
          onSubmit={e => {
            this.donationHandler(e);
          }}
        >
          <input type="text" /> Name <br />
          <input type="text" /> Wallet <br />
          <input type="text" /> Amount raised <br />
          <input type="file" name="icon" id="icon" /> Icon <br />
          <input type="file" name="symbol" id="symbol" /> symbol <br />
          <input type="file" name="qr" id="qr" /> QR <br />
          <button type="submit">Send</button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>Story</h1>
        <form
          onSubmit={e => {
            this.storyHandler(e);
          }}
        >
          <input type="text" /> Title <br />
          <input type="text" /> Subtitle <br />
          <textarea name="" id="" cols="30" rows="10" /> Content <br />
          <input type="file" name="cover" id="cover" /> cover <br />
          <input type="checkbox" name="main" id="main" /> main <br />
          <input type="checkbox" name="featured" id="featured" /> featured{" "}
          <br />
          <button type="submit">Send</button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1>List Donation</h1>
        <ul>{this.donationList()}</ul>
        <br />
        <h1>List Story</h1>
        <ul>{this.storyList()}</ul>
        <br />
        <h1>FAQ</h1>
        {this.faqList()}
      </div>
    );
  }
}
