// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
// Components & Containers
import "./style.css";
import { StorieCard } from "../../components/Card";

export default class Stories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title || "Stories From Venezuelans",
      description:
        props.description ||
        "Read stories from Venezuelans during this crisis. Some identities are kept private.",
      stories: props.stories
    };
  }

  shouldComponentUpdate = nextProps => {
    console.log("nextProps", nextProps);
    const { title, description, stories } = this.state;
    if (
      title !== nextProps.title ||
      description !== nextProps.description ||
      stories !== nextProps.stories
    ) {
      this.setState(
        {
          title: nextProps.title,
          description: nextProps.description,
          stories: nextProps.stories
        },
        () => {
          // console.log(this.state);
        }
      );
    }
    return true;
  };

  render() {
    const { title, description, stories } = this.state;
    return (
      <section className="storiesSection" id="Stories">
        <h2 className="storiesSection__title">{title}</h2>
        <h3 className="storiesSection__subTitle">{description}</h3>
        <div className="storiesSection__storiesContainer">
          {stories.map(story => <StorieCard key={story._id} story={story} />)}
        </div>
        <Link to={`/stories`} className="storiesSection__button">
          <button className="storiesSection__button">More Stories</button>
        </Link>
      </section>
    );
  }
}
