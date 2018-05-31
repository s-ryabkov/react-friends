import React from 'react';
import PropTypes from 'prop-types';

/**
 * Intended to contains only its children without any additional components
 */
class EmptyLayout extends React.Component {

  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

EmptyLayout.propTypes = {
  children: PropTypes.object,
};

export default EmptyLayout;
