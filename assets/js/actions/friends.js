import axios from 'axios';
import { SubmissionError } from 'redux-form';
import * as ActionTypes from './action-types';

export const setFriends = (rows, total) => {
  return {
    rows,
    total,
    type: ActionTypes.SET_FRIENDS_LIST,
  };
};

export const getFriends = (searchQuery = { limit: 10 }) => {
  return (dispatch) => {
    const req = {
      url: 'http://localhost:3000/api/friends',
      method: 'GET',
      params: searchQuery,
    };
    return axios(req)
      .then((response) => {
        const { rows, total } = response.data;
        dispatch(setFriends(rows, total));
      })
      .catch(({ response: { data: { message } } }) => {
        throw new SubmissionError({ '_error': message });
      });
  };

};
