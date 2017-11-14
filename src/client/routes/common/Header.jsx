import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import actions from '../../actions';
import translate from './translate';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  headerMenuUserAction(name) {
    this.props.actions.userAction({
      pathname: this.props.history.location.pathname,
      name,
      type: 'link',
      description: 'Header menu links click.',
    });
  }

  handleLogout() {
    this.props.actions.userAction({
      pathname: this.props.history.location.pathname,
      name: 'headerMenu_logout',
      type: 'button',
      description: 'Header menu links click.',
    });
    this.props.actions.postLogout((res) => {
      if (res.code === 200) {
        global.window.location.reload();
      }
    });
  }

  menuList() {
    const { userInfo } = this.props;
    return (
      <div className="sl-maskbox-links">
        <Scrollbars>
          <NavLink
            className="sl-maskbox-link"
            activeClassName="sl-maskbox-active"
            to="/"
            exact
            onClick={() => { this.headerMenuUserAction('headerMenu_home'); }}
          >
            <i className="icon icon-home" /><span>React Koa Boilerplate</span>
          </NavLink>
          <NavLink
            className="sl-maskbox-link"
            activeClassName="sl-maskbox-active"
            to="/explore"
            onClick={() => { this.headerMenuUserAction('headerMenu_explore'); }}
          >
            <i className="icon icon-compass2" /><span>{translate('Explore')}</span>
          </NavLink>
          <NavLink
            className="sl-maskbox-link"
            activeClassName="sl-maskbox-active"
            to="/about"
            onClick={() => { this.headerMenuUserAction('headerMenu_about'); }}
          >
            <i className="icon icon-notification" /><span>{translate('About')}</span>
          </NavLink>
          <NavLink
            className="sl-maskbox-link"
            activeClassName="sl-maskbox-active"
            to="/choose-locale"
            onClick={() => { this.headerMenuUserAction('headerMenu_choose-locale'); }}
          >
            <i className="icon icon-sphere" /><span>{translate('localeValue')}</span>
          </NavLink>
          {userInfo.isLogin
            ? (
              <div>
                <NavLink
                  className="sl-maskbox-link"
                  activeClassName="sl-maskbox-active"
                  to="/home"
                  onClick={() => { this.headerMenuUserAction('headerMenu_home'); }}
                >
                  <i className="icon icon-user" /><span>{userInfo.fullname}</span>
                </NavLink>
                <NavLink
                  className="sl-maskbox-link"
                  activeClassName="sl-maskbox-active"
                  to="/upload"
                  onClick={() => { this.headerMenuUserAction('headerMenu_upload'); }}
                >
                  <i className="icon icon-upload" /><span>{translate('Upload')}</span>
                </NavLink>
                <button
                  className="sl-maskbox-link sl-button"
                  onClick={() => { this.handleLogout(); }}
                >
                  <i className="icon icon-exit" /><span>{translate('Logout')}</span>
                </button>
              </div>
            )
            : (
              <div>
                <NavLink
                  className="sl-maskbox-link"
                  activeClassName="sl-maskbox-active"
                  to="/login"
                  onClick={() => { this.headerMenuUserAction('headerMenu_login'); }}
                >
                  <i className="icon icon-enter" /><span>{translate('Login')}</span>
                </NavLink>
              </div>
            )}
        </Scrollbars>
      </div>
    );
  }

  render() {
    const { userInfo } = this.props;
    const menu = (
      <div
        className="sl-maskbox"
        onKeyUp={() => {}}
        onClick={this.handleMenuClick}
        role="button"
        tabIndex="0"
      >
        <button className="icon icon-cross-thin sl-maskbox-close-btn sl-button" />
        {this.menuList(userInfo)}
      </div>
    );

    return (
      <div className="header">
        <div className="header-logo">
          <i className="icon icon-shulive-box" />
          <span>React Koa Boilerplate</span>
        </div>
        <div className="header-menu">
          <button
            className="icon icon-menu sl-button"
            onClick={this.handleMenuClick}
          />
        </div>
        {this.state.showMenu ? menu : ''}
      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
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
)(Header));
