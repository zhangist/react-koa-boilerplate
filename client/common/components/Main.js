import React, {Component} from 'react'
import { Route } from 'react-router'
import styles from '../stylus/Main'

class Main extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <main className={styles.main}>
        <Route path='/home' component={require('../../home/containers/App')}/>
        <Route path='/explore' component={require('../../explore/containers/App')}/>
        <Route path='/about' component={require('../../about/containers/App')}/>
      </main>
    )
  }
}

export default Main
