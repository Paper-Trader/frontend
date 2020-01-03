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
          About
        </Link>
        <Link to="/team" className="nav-left-link">
          Team
        </Link>
      </div>
      <div className="nav-right">
        <Button className="nav-signin-button">
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button className="nav-signup-button">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}

export default Nav;