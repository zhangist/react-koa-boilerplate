import types from '../constants/ActionTypes';

function userInfo(state = null, action) {
  switch (action.type) {
    case types.UPDATE_USER_INFO:
      return action.data;
    case types.CLEAR_USER_INFO:
      return null;
    default:
      return state;
  }
}

export default userInfo;
