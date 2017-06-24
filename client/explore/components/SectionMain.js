import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import styles from '../stylus/SectionMain'

class SectionMain extends Component {
  constructor() {
    super()
  }

  handleFetch() {
    const { actions } = this.props

    actions.fetchUserInfo()
  }

  handleClear() {
    const { actions } = this.props

    actions.clearUserInfo()
  }

  render() {
    const { userInfo } = this.props

    return (
      <section className={styles.sectionMain}>
        Explore
        <a href="javascript:void(0)"
          className={styles.btn}
          onClick={this.handleFetch.bind(this)}>
          Fetch Data
        </a>
        <a href="javascript:void(0)"
          className={styles.btn}
          onClick={this.handleClear.bind(this)}>
          Clear
        </a>
        <br/>
        <span className={styles.info}>{ userInfo && JSON.stringify(userInfo) }</span>
      </section>
    )
  }
}

SectionMain.propTypes = {
  actions: PropTypes.object,
  userInfo: PropTypes.object
}

export default SectionMain
