import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import logo from '../assets/logo.svg'

function Nav() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/about" className="nav-left-link">
          ABOUT
        </Link>
        <Link to="/team" className="nav-left-link">
          TEAM
        </Link>
      </div>
      <div className="nav-right">
        <Button className="signin-button">
          <Link to="/signin" className="signin-button-text">SIGN IN</Link>
        </Button>
        <Button className="signup-button">
          <Link to="/signup" className="signup-button-text">SIGN UP</Link>
        </Button>
      </div>
    </div>
  );
}

export default Nav;