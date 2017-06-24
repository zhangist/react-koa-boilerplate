import React, { Component } from 'react'
import SectionMain from '../components/SectionMain'
import styles from '../stylus/App'

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className={styles.app}>
        <SectionMain></SectionMain>
      </div>
    )
  }
}

export default App
