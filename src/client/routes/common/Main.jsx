import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from './Header';
import actions from '../../actions';
import './Base.styl';
import './Main.styl';

class Main extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div className="app">
        <Header />
        <div className="content">
          <Scrollbars universal>
            {renderRoutes(route.routes)}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
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
)(Main));
