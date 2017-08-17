import * as ActionTypes from '../action-types/index';

const friends = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_FRIENDS_LIST:
      return {
        ...state,
        rows: action.rows,
        number: action.number,
        total: action.total,
      };

    default:
      return state;
  }
};

export default friends;
