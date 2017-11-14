import { combineReducers } from 'redux';
import appData from './appData';
import userInfo from './userInfo';

const rootReducer = combineReducers({
  appData,
  userInfo,
});

export default rootReducer;
