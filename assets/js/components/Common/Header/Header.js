import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

class Header extends Component {

  render() {
    const { user } = this.props;

    return <header className='friends-header'>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/login'>React-Friends</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to='/friends'>
            <NavItem eventKey={1}>Friends</NavItem>
          </LinkContainer>
        </Nav>
        {
          !!user &&
          <Nav pullRight>
            <LinkContainer to='/'>
              <NavItem eventKey={2}>{user.email}</NavItem>
            </LinkContainer>
            <NavItem eventKey={3} href='/api/logout'>Logout</NavItem>
          </Nav>
        }
      </Navbar>
    </header>;
  }
}

Header.propTypes = {
  user: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
  };
}

export default connect(
  mapStateToProps,
  {},
)(Header);
