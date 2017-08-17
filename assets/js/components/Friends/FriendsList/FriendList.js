import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Friend from './../Friend/Friend';

export default class FriendsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: {
        from: 0,
        number: 10,
        name: '',
      },
    };
  }

  componentDidMount() {
    if (!this.props.isAuth) {
      return this.props.history.push('/login');
    }
    this.props.getFriends(this.state.searchQuery);
  }

  render() {
    const { rows, total } = this.props;
    return <div>
      <div>
        Total: {total}
      </div>
      <table>
        {
          rows.map((friend) => <Friend friend={friend} />)
        }
      </table>
    </div>;
  }
}

FriendsList.propTypes = {
  rows: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  getFriends: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

FriendsList.defaultProps = {
  rows: [],
  total: 0,
};
