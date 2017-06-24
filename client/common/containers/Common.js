import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import actions from '../actions'
import stylesCommon from '../stylus/Common'
import stylesMain from '../stylus/Main'
import '../stylus/global'

class Common extends Component {
  constructor() {
    super()
  }

  render() {
    const { route } = this.props

    return (
      <div className={stylesCommon.app}>
        <Header/>
        <Navbar/>
        <main className={stylesMain.main}>
          {renderRoutes(route.routes)}
        </main>
      </div>
    )
  }
}

Common.propTypes = {
  route: PropTypes.object
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Common))
