import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';

const checkUserStatus = (props) => {
  // check login status
  if (!(props.userInfo && props.userInfo.isLogin)) {
    props.actions.updateAppData({ returnLocation: props.location });
    // const location = { pathname: '/login', state: { msg: { type: 'info', text: '请先登录。' } } };
    return <Redirect to="/login" />;
  }

  return false;
};

checkUserStatus.propTypes = {
  userInfo: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default checkUserStatus;
