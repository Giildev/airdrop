// Dependencies
import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Link, Route, Switch, withRouter } from "react-router-dom";
// Components & Containers
import "./style.css";
//import TabLang from "../../components/Admin/TabLang/";
import SideMenu from '../../components/Admin/SideMenu/';
import AdminStory from '../../components/Admin/Stories';
import AdminDonations from '../../components/Admin/Donations';
import AdminHome from '../../components/Admin/Preview';
import AdminSite from '../../components/Admin/Site';
import AdminAmount from '../../components/Admin/Amount';
import AdminTimeLine from '../../components/Admin/Timeline';
import AdminUsers from '../../components/Admin/Users';
import AdminFaqs from '../../components/Admin/Faqs';

export default class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props;
    return <div>
        <div className="containerDash">
          <SideMenu />
          <div className="containerDash__content">
            <Route exact path={`${match.url}`} component={AdminHome} />
            <Route path={`${match.url}/manage`} component={AdminSite} />
            <Route path={`${match.url}/stories`} component={AdminStory} />
            <Route path={`${match.url}/donations`} component={AdminDonations} />
            <Route path={`${match.url}/amount`} component={AdminAmount} />
            <Route path={`${match.url}/timeline`} component={AdminTimeLine} />
            <Route path={`${match.url}/users`} component={AdminUsers} />
            <Route path={`${match.url}/faqs`} component={AdminFaqs} />
          </div>
        </div>
      </div>;
  }
}
