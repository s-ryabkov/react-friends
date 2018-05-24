import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Friend extends Component {

  render() {
    const { friend } = this.props;

    return (
      <tr>
        <td>{friend.firstName}</td>
        <td>{friend.lastName}</td>
        <td>{friend.age}</td>
        <td>{friend.gender}</td>
        <td>{moment(friend.birthDate).format('YYYY-MM-DD')}</td>
      </tr>
    );
  }
}

Friend.propTypes = {
  friend: PropTypes.object.isRequired,
};
