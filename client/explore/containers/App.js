import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../../common/actions'
import SectionMain from '../components/SectionMain'
import styles from '../stylus/App'

class AppComponent extends Component {
  constructor() {
    super()
  }

  render() {
    const { userInfo, actions } = this.props

    return (
      <div className={styles.app}>
        <SectionMain userInfo={userInfo} actions={actions}></SectionMain>
      </div>
    )
  }
}

AppComponent.propTypes = {
  actions: PropTypes.object,
  userInfo: PropTypes.object
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)
