import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actions from '../../../actions';
import translate from '../../common/translate';
import './style.styl';

class ChooseLocale extends Component {
  constructor(props) {
    super(props);

    this.onClickLocale = this.onClickLocale.bind(this);
  }

  onClickLocale(locale) {
    this.props.actions.chooseLocale(locale, (res) => {
      if (res.code === 200) {
        const window = global.window || false;
        // const document = global.document || {};
        if (window) {
          window.location.reload();
        }
      }
    });
  }

  render() {
    return (
      <div className="page site-choose-locale">
        <div className="page-title">{translate('Choose Locale')}</div>
        <div className="page-subtitle">
          <span>{translate('Current')}: </span>
          <span>{translate('localeValue')}</span>
        </div>
        <div className="p-back">
          <span>{translate('If the selection takes effect, click ')}</span>
          <button className="sl-button p-back-btn" onClick={this.props.history.goBack}>{translate('back')}</button>
        </div>
        <div className="p-locales">
          <button className="sl-button p-locale" onClick={() => { this.onClickLocale('en'); }}>
            <span>{translate('en')}</span>
          </button>
          <button className="sl-button p-locale" onClick={() => { this.onClickLocale('zh-cn'); }}>
            <span>{translate('zh-cn')}</span>
          </button>
          <button className="sl-button p-locale" onClick={() => { this.onClickLocale('zh-tw'); }}>
            <span>{translate('zh-tw')}</span>
          </button>
        </div>
      </div>
    );
  }
}

ChooseLocale.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseLocale));
