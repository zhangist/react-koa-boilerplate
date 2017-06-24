import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import DevTools from './DevTools'
import Common from './Common'

class Root extends Component {
  constructor() {
    super()
    this.state = {isMounted: false}
  }

  componentDidMount() {
    this.setState({isMounted: true})
    console.log('Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.')
  }

  render() {
    const { isMounted } = this.state,
      { route } = this.props

    return (
      <div>
        <Common route={route}></Common>
        {isMounted && <DevTools/>}
      </div>
    )
  }
}

Root.propTypes = {
  route: PropTypes.object
}

export default Root
