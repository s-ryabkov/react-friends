import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import Login from './auth/login/Login';

export default class App extends Component {

  render() {
    return <div className='react-friends'>
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
      </Switch>
    </div>;
  }
}
