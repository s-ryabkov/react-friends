import * as ActionTypes from '../action-types/index';

const friends = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_FRIENDS_LIST:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default friends;
