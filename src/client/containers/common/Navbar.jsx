import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.styl';

const Navbar = () => (
  <nav className="navbar">
    <NavLink className="navbar-link" activeClassName="navbar-active" to="/" exact>home</NavLink>
    <NavLink className="navbar-link" activeClassName="navbar-active" to="/explore">explore</NavLink>
    <NavLink className="navbar-link" activeClassName="navbar-active" to="/about">about</NavLink>
  </nav>
);

export default Navbar;
