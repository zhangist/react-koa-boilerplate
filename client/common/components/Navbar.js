import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../stylus/Navbar'

class Navbar extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <NavLink className={styles.link} activeClassName={styles.active} to="/" exact>home</NavLink>
        <NavLink className={styles.link} activeClassName={styles.active} to="/explore">explore</NavLink>
        <NavLink className={styles.link} activeClassName={styles.active} to="/about">about</NavLink>
      </nav>
    )
  }
}

export default Navbar
