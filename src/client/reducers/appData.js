import types from '../constants/ActionTypes';

function appData(state = null, action) {
  switch (action.type) {
    case types.UPDATE_APP_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default appData;
