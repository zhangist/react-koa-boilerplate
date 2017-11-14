import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import actions from '../../../actions';
import './style.styl';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailCheckResult: '',
      passwordCheckResult: '',
      msg: {},
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setMsg();
  }

  setMsg() {
    this.setState({
      msg: this.props.location.state ? this.props.location.state.msg : {},
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // check email and password
    const { email, password } = this.state;
    const emailReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
    let emailCheckResult = '';
    let passwordCheckResult = '';
    let checkResult = true;
    if (email) {
      if (!emailReg.test(email)) {
        checkResult = false;
        emailCheckResult = '邮箱格式错误';
      }
    } else {
      checkResult = false;
      emailCheckResult = '请填写登录邮箱';
    }
    if (password) {
      if (password.length < 6) {
        checkResult = false;
        passwordCheckResult = '密码最小长度6位';
      }
    } else {
      checkResult = false;
      passwordCheckResult = '请填写登录密码';
    }
    this.setState({
      emailCheckResult,
      passwordCheckResult,
    });

    // check valid
    if (checkResult) {
      this.props.actions.postLogin(email, password, () => {
        // if returnLocation exist
        const { returnLocation } = this.props.appData;
        if (returnLocation) {
          this.props.actions.updateAppData({ returnLocation: null });
          this.props.history.push(returnLocation.pathname);
        } else {
          this.props.history.push('/');
        }
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="site-login sl-module">
        <div className="sl-module-title sl-module-center sl-module-blue">登录</div>
        <div className="p-row">
          <div className="sl-input sl-input-icon">
            <i className="icon icon-user" />
            <input
              type="text"
              placeholder="邮箱"
              value={this.state.email}
              onChange={this.handleEmail}
              style={this.state.emailCheckResult ? { borderColor: 'red' } : {}}
            />
            <span className="sl-input-hint">{this.state.emailCheckResult}</span>
          </div>
        </div>
        <div className="p-row">
          <div className="sl-input sl-input-icon">
            <i className="icon icon-key" />
            <input
              type="password"
              placeholder="密码"
              value={this.state.password}
              onChange={this.handlePassword}
              style={this.state.passwordCheckResult ? { borderColor: 'red' } : {}}
            />
            <span className="sl-input-hint">{this.state.passwordCheckResult}</span>
          </div>
        </div>
        <div className="p-row">
          <div className="sl-input">
            <input type="submit" value="登录" onClick={this.handleSubmit} />
          </div>
        </div>
        <div className="p-row">
          <Link className="sl-link" href to="/forget-password">忘记密码？</Link>
        </div>
        <div className="p-row">
          {this.state.msg.text}
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }).isRequired,
  appData: PropTypes.object.isRequired,
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
)(Login));
