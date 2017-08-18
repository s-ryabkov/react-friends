import axios from 'axios';
import cookie from 'react-cookies';
import { SubmissionError } from 'redux-form';
import * as ActionTypes from './../action-types/index';

export const setAuth = (token, user) => {
  return {
    authToken: token,
    user: user,
    type: ActionTypes.SET_AUTH_TOKEN,
  };
};

export const login = (values, callback) => {
  return (dispatch) => {
    return axios({
        url: '/api/login',
        method: 'POST',
        data: values,
      },
    )
      .then((response) => {
        const { token, user } = response.data;
        // TODO: we would need to re-fetch it with GET /api/session rather than use cookie
        cookie.save('email', user.email);
        dispatch(setAuth(token, user));
        dispatch(callback);
      })
      .catch(({ response: { data: { message } } }) => {
        throw new SubmissionError({ '_error': message });
      });
  };

};
