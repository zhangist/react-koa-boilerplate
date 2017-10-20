import React from 'react';
import './Header.styl';

const Header = () => (
  <header className="header">
    <div className="logo left">
      <span>React-Koa-Boilerplate</span>
    </div>
    <div className="desc right">
      <span>Hello, world！</span>
    </div>
  </header>
);

export default Header;
