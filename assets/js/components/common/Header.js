import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

export default class Header extends Component {

  render() {
    const { user } = this.props;

    return <header className='header'>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/login'>React-Friends</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href='/friends'>Friends</NavItem>
        </Nav>
        {
          !!user &&
          <Nav pullRight>
            <NavItem eventKey={2} href='#'>{user.email}</NavItem>
          </Nav>
        }
      </Navbar>
    </header>;
  }
}

Header.propTypes = {
  user: PropTypes.object,
};
