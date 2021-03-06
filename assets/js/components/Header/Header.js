import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {

  render() {
    const { user } = this.props;

    return <header className='friends-header'>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>React-Friends</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {
          !user &&
          <Nav>
            <LinkContainer to='/login'>
              <NavItem eventKey={2}>Login</NavItem>
            </LinkContainer>
          </Nav>
        }
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

export default Header;
