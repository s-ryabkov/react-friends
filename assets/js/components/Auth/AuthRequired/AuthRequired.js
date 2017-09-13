import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }

  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool,
    history: PropTypes.object,
  };

  function mapStateToProps(state) {
    return {
      authenticated: !!state.authentication.authToken,
    };
  }

  return connect(
    mapStateToProps,
    null,
  )(Authentication);
}
