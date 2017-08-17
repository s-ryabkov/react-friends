import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Friend from './../Friend/Friend';

export default class FriendsList extends Component {

  render() {
    const { friends } = this.props;
    return <div>
      <div>
        FriendsList component {friends.length}
      </div>
      {
        friends.map((friend) => <Friend friend={friend} />)
      }
    </div>;
  }
}

FriendsList.propTypes = {
  friends: PropTypes.array.isRequired,
};

FriendsList.defaultProps = {
  friends: [],
};
