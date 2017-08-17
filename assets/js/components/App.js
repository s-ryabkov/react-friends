import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Common/Header/Header';
import Login from './Auth/Login/Login';
import FriendsList from './Friends/FriendsList/FriendList';

export default class App extends Component {

  render() {
    return <div className='react-friends'>
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/friends' component={FriendsList} />
      </Switch>
    </div>;
  }
}
