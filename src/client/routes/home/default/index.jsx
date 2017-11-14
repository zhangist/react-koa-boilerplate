import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actions from '../../../actions';
import checkUserStatus from '../../common/checkUserStatus';
import translate from '../../common/translate';

class HomeDefault extends Component {
  constructor(props) {
    super(props);

    // check user status
    this.checkUserStatusResult = checkUserStatus(this.props);
  }

  render() {
    // redirect if checkUserStatusResult not false
    if (this.checkUserStatusResult) return this.checkUserStatusResult;

    return (
      <div className="page home-default">
        <div className="page-title">{translate('Home Page')}</div>
        <div className="page-subtitle">{translate('Home Page Sub-title.')}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeDefault));
