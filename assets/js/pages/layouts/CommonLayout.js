import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

class CommonLayout extends React.Component {

  render() {
    return (
      <div {...this.props}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

CommonLayout.propTypes = {
  children: PropTypes.object,
};

export default CommonLayout;
