import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import Header from './Common/Header/Header';
import LoginPageContainer from './../containers/LoginPageContainer';
import FriendListContainer from './../containers/FriendListContainer';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverError: null,
    };
  }

  render() {
    return <div className='react-friends'>
      <Header />
      {
        this.state.serverError &&
        <Alert bsStyle='danger'>{_.get(this.state.serverError, 'response.body.message')}</Alert>
      }
      <Switch>
        <Route path='/login' component={LoginPageContainer} />
        <Route path='/friends' component={FriendListContainer} />
      </Switch>
    </div>;
  }
}

App.propTypes = {};
