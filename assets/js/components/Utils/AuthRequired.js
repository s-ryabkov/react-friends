import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function AuthRequired(props) {
  return (
    props.authenticated
      ? props.children
      : <Redirect to={'/login'} />
  );
}

AuthRequired.propTypes = {
  authenticated: PropTypes.bool,
  children: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    authenticated: !!state.authentication.authToken,
  };
}

export default connect(
  mapStateToProps,
  null,
)(AuthRequired);
