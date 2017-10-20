import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import Header from './Header';
import Navbar from './Navbar';
import actions from '../../actions';
import './App.styl';

class Root extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div>
        <Header />
        <Navbar />
        <div className="app">
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

Root.propTypes = {
  route: PropTypes.object.isRequired,
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
)(Root));
