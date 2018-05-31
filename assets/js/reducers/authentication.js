import * as ActionTypes from './../actions/action-types';

const auth = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.authToken,
        user: action.user,
      };

    case ActionTypes.UNSET_AUTH_TOKEN:
      return {
        ...state,
        authToken: null,
      };

    default:
      return state;
  }
};

export default auth;
