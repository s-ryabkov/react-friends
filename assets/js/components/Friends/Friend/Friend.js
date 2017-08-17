import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Friend extends Component {

  render() {
    const { friend } = this.props;
    return <div>
      <div>
        Friend component {friend}
      </div>
    </div>;
  }
}

Friend.propTypes = {
  friend: PropTypes.object.isRequired,
};
