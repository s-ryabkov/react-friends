import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authentication from './authentication';
import friends from './friends';

export default combineReducers({
  authentication,
  friends,
  routerReducer,
});
