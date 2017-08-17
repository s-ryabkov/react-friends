import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Friend extends Component {

  render() {
    const { friend } = this.props;
    return <tr>
        <td>{friend.firstName}</td>
        <td>{friend.lastName}</td>
        <td>{friend.email}</td>
    </tr>;
  }
}

Friend.propTypes = {
  friend: PropTypes.object.isRequired,
};
