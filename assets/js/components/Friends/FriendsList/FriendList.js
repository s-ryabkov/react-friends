import React, { Component } from 'react';
import { Pager, Row, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Friend from './../Friend/Friend';

export default class FriendsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: {
        from: 0,
        number: 5,
      },
    };

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.getFriends(this.state.searchQuery);
  }

  prevPage() {
    const from = Math.max(0, this.state.searchQuery.from - this.state.searchQuery.number);
    const newSearchQuery = {
      from,
      number: this.state.searchQuery.number,
    };
    this.setState({ searchQuery: newSearchQuery }, () => {
      this.props.getFriends(this.state.searchQuery);
    });
  }

  nextPage() {
    const from = Math.min(this.state.searchQuery.from + this.state.searchQuery.number, this.props.total - 1);
    const newSearchQuery = {
      from,
      number: this.state.searchQuery.number,
    };
    this.setState({ searchQuery: newSearchQuery }, () => {
      this.props.getFriends(this.state.searchQuery);
    });
  }

  render() {
    const { rows, total } = this.props;
    const { from, number } = this.state.searchQuery;

    return <div className='container'>
      <Row>
        <div>Total: {total} ({from}-{from + number})</div>
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Birth date</th>
            </tr>
          </thead>
          <tbody>
            {
              rows.map((friend) => <Friend friend={friend} key={friend.id} />)
            }
          </tbody>
        </Table>
      </Row>
      <Row>
        <Pager>
          <Pager.Item href='#' onClick={this.prevPage}>Previous</Pager.Item>
          <Pager.Item href='#' onClick={this.nextPage}>Next</Pager.Item>
        </Pager>
      </Row>
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
