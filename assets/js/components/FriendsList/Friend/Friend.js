import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Friend extends Component {

  render() {
    const { friend } = this.props;

    return (
      <div className={'friend'}>
        <div className={'col-md-3'}>{friend.firstName}</div>
        <div className={'col-md-3'}>{friend.lastName}</div>
        <div className={'col-md-2'}>{friend.age}</div>
        <div className={'col-md-2'}>{friend.gender}</div>
        <div className={'col-md-2'}>{moment(friend.birthDate).format('YYYY-MM-DD')}</div>
      </div>
    );
  }
}

Friend.propTypes = {
  friend: PropTypes.object.isRequired,
};
