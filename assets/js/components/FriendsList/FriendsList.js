import React, { Component } from 'react';
import { Pager, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Friend from './Friend/Friend';

export default class FriendsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: {
        from: 0,
        number: 5,
        query: '',
      },
      filters: {
        ageFrom: null,
        ageTo: null,
        gender: null,
      },
    };

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchFriends = this.searchFriends.bind(this);
  }

  componentDidMount() {
    if (this.props.rows.length === 0) {
      this.searchFriends();
    }
  }

  prevPage() {
    const from = Math.max(0, this.state.searchQuery.from - this.state.searchQuery.number);
    const newSearchQuery = {
      from,
      number: this.state.searchQuery.number,
      query: this.state.searchQuery.query,
    };
    this.setState({ searchQuery: newSearchQuery }, () => {
      this.props.getFriends(this.state.searchQuery);
    });
  }

  nextPage() {
    const from = Math.min(this.state.searchQuery.from + this.state.searchQuery.number, this.props.total);
    const newSearchQuery = {
      from,
      number: this.state.searchQuery.number,
      query: this.state.searchQuery.query,
    };
    this.setState({ searchQuery: newSearchQuery }, () => {
      this.props.getFriends(this.state.searchQuery);
    });
  }

  onChange(ev) {
    const type = ev.target.type;
    const isNumber = type === 'number';
    const newState = _.set(
      this.state,
      ev.target.name,
      isNumber ? Number.parseInt(ev.target.value, 10) : ev.target.value,
    );
    this.setState(newState);
  }

  searchFriends() {
    this.props.getFriends(this.state.searchQuery);
  }

  render() {
    const { rows, total } = this.props;
    const { from, number } = this.state.searchQuery;
    const { filters } = this.state;

    const filteredRows = rows.filter((friend) => {
      const hasFilters = (filters.ageFrom && filters.ageTo) || filters.gender;
      if (!hasFilters) {
        return true;
      }
      const isFiltered = [];
      if (filters.ageFrom && filters.ageTo) {
        isFiltered.push(friend.age >= filters.ageFrom && friend.age <= filters.ageTo);
      }
      if (filters.gender) {
        isFiltered.push(filters.gender === friend.gender);
      }
      return !_.some(isFiltered, (match) => !match);
    });

    return <div className='friends-list'>
      <div className='container'>
        <Row>
          <div>Total: {total} ({from + 1}-{from + number})</div>
        </Row>
        <Row>
          <input type='text' name='searchQuery.query' placeholder='Name' onChange={this.onChange} />
          <button onClick={this.searchFriends}>Search</button>
        </Row>

        <div className={'friends-list__table'}>

          <div className={'row friends-list_table__header'}>
            <div className={'col-md-3'}>Name</div>
            <div className={'col-md-3'}>Last name</div>
            <div className={'col-md-2'}>
              <span>Age</span>
              <input
                className={'friends-list_table__input-filter'}
                type='number'
                name='filters.ageFrom'
                placeholder='From'
                onChange={this.onChange} />
              <input
                className={'friends-list_table__input-filter'}
                type='number'
                name='filters.ageTo'
                placeholder='To'
                onChange={this.onChange} />
            </div>
            <div className={'col-md-2'}>
              <span>Gender</span>
              <input
                className={'friends-list_table__input-filter'}
                type='text'
                name='filters.gender'
                placeholder='M or F'
                onChange={this.onChange} />
            </div>
            <div className={'col-md-2'}>Birth date</div>
          </div>

          <div className={'row friends-list_table__body'}>
            {
              filteredRows.map((friend) => <Friend friend={friend} key={friend.id} />)
            }
          </div>

        </div>

        <Row>
          <Pager>
            <Pager.Item
              href='#'
              disabled={this.state.searchQuery.from - this.state.searchQuery.number < 0}
              onClick={this.prevPage}>
              Previous
            </Pager.Item>
            <Pager.Item
              href='#'
              disabled={this.state.searchQuery.from + this.state.searchQuery.number > this.props.total}
              onClick={this.nextPage}>
              Next
            </Pager.Item>
          </Pager>
        </Row>
      </div>
    </div>;
  }
}

FriendsList.propTypes = {
  rows: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  getFriends: PropTypes.func.isRequired,
};

FriendsList.defaultProps = {
  rows: [],
  total: 0,
};
