import axios from 'axios';
import { SubmissionError } from 'redux-form';
import * as ActionTypes from './../action-types/index';

export const setFriends = (rows, total) => {
  return {
    rows,
    total,
    type: ActionTypes.SET_FRIENDS_LIST,
  };
};

export const getFriends = (searchQuery, callback) => {
  return (dispatch) => {
    return axios({
        url: '/api/friends',
        method: 'GET',
        params: searchQuery,
      },
    )
      .then((response) => {
        const { rows, total } = response.data;
        dispatch(setFriends(rows, total));
        callback && dispatch(callback);
      })
      .catch(({ response: { data: { message } } }) => {
        throw new SubmissionError({ '_error': message });
      });
  };

};
