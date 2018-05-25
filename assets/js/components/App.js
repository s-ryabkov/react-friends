import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import HeaderContainer from './../containers/HeaderContainer';
import routes from './../routes';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverError: null,
    };
  }

  render() {
    return (
      <div className='react-friends'>
        <HeaderContainer />
        {
          this.state.serverError &&
          <Alert bsStyle='danger'>{_.get(this.state.serverError, 'response.body.message')}</Alert>
        }
        <Switch>
          {
            routes.map(route => <Route {...route} />)
          }
        </Switch>
      </div>
    );
  }
}

App.propTypes = {};
