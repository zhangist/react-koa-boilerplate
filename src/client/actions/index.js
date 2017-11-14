import types from '../constants/ActionTypes';
import utils from '../utils';

function updateAppData(appData) {
  return {
    type: types.UPDATE_APP_DATA,
    data: appData,
  };
}

function resetAppData() {
  return {
    type: types.RESET_APP_DATA,
  };
}

function updateUserInfo(userInfo) {
  return {
    type: types.UPDATE_USER_INFO,
    data: userInfo,
  };
}

function clearUserInfo() {
  return {
    type: types.CLEAR_USER_INFO,
  };
}

function fetchUserInfo() {
  return (dispatch) => {
    utils.ajax({
      url: '/api/user/getUserInfo',
      type: 'get',
    }).then((res) => {
      dispatch(updateUserInfo(res));
    });
  };
}

function postLogin(email, password, callback) {
  return (dispatch) => {
    utils.ajax({
      url: '/api/site/login',
      type: 'post',
      data: { email, password },
    }).then((res) => {
      dispatch(updateUserInfo(res.data));
      if (callback) {
        callback(res);
      }
    });
  };
}

function postLogout(callback) {
  return (dispatch) => {
    utils.ajax({
      url: '/api/site/logout',
      type: 'post',
    }).then((res) => {
      dispatch(updateUserInfo(res.data));
      if (callback) {
        callback(res);
      }
    });
  };
}

function refreshUserInfo(props) {
  return (dispatch) => {
    utils.ajax({
      url: '/api/user/refresh-user-info',
      type: 'post',
      data: {
        pathname: props.location.pathname,
      },
    }).then((res) => {
      dispatch(updateUserInfo(res.data));
    });
  };
}

// post user action to server
function userAction(action) {
  return (dispatch) => {
    utils.ajax({
      url: '/api/site/user-action',
      type: 'post',
      data: action,
    }).then((res) => {
      if (res.data) {
        dispatch(updateUserInfo(res.data));
      }
    });
  };
}

// post user action to server
function upload(file, callback) {
  return () => {
    const formData = new FormData(); // eslint-disable-line no-undef
    formData.append('file', file);

    utils.ajax({
      url: '/api/user/upload',
      type: 'post',
      data: formData,
    }).then((res) => {
      if (callback) {
        callback(res);
      }
    }).catch((err) => {
      if (callback) {
        callback(err);
      }
    });
  };
}

// choose locale
function chooseLocale(locale, callback) {
  return () => {
    utils.ajax({
      url: '/api/site/choose-locale',
      type: 'post',
      data: { locale },
    }).then((res) => {
      if (callback) {
        callback(res);
      }
    }).catch((err) => {
      if (callback) {
        callback(err);
      }
    });
  };
}

export default {
  updateAppData,
  resetAppData,
  updateUserInfo,
  fetchUserInfo,
  refreshUserInfo,
  clearUserInfo,
  postLogin,
  postLogout,
  userAction,
  upload,
  chooseLocale,
};
