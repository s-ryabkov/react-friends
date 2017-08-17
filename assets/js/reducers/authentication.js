import * as ActionTypes from '../action-types/index';

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
