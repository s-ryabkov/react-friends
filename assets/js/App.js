import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthRequired from './components/Utils/AuthRequired';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';
import routes from './routes';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      serverError: null,
    };
  }

  render() {
    return (
      <div className='react-friends'>
        {
          this.state.serverError &&
          <Alert bsStyle='danger'>{_.get(this.state.serverError, 'response.body.message')}</Alert>
        }
        <Switch>
          {
            routes.map(route => {
              if (route.auth) {
                return <AuthRequired {...route} ><Route {...route} /></AuthRequired>;
              }
              return <Route {...route} />;
            })
          }
        </Switch>
      </div>
    );
  }
}

App.propTypes = {};
