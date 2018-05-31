import axios from 'axios';
import { push } from 'react-router-redux';
import cookie from 'react-cookies';
import { SubmissionError } from 'redux-form';
import * as ActionTypes from './action-types';

export const setAuth = (token, user) => {
  return {
    authToken: token,
    user: user,
    type: ActionTypes.SET_AUTH_TOKEN,
  };
};

export const login = (values) => {
  return (dispatch) => {
    const req = {
      url: '/api/login',
      method: 'POST',
      data: values,
    };
    return axios(req)
      .then((response) => {
        const { token, user } = response.data;
        // TODO: we would need to re-fetch it with GET /api/session rather than use cookie
        cookie.save('email', user.email);
        dispatch(setAuth(token, user));
        dispatch(push('/friends'));
      })
      .catch(({ response: { data: { message } } }) => {
        throw new SubmissionError({ '_error': message });
      });
  };

};

export const loggedInRedirect = (url) => {
  return (dispatch) => {
    dispatch(push(url));
  };
};

export const logout = () => {
  return {
    authToken: null,
    user: null,
    type: ActionTypes.UNSET_AUTH_TOKEN,
  };
};
