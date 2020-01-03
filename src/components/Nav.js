import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import logo from '../assets/logo.svg'

function Nav() {
  return (
    <div className="navbar" >
      <Link to="/"><img src={logo} alt="logo" /></Link>
      <Link to="/about">About</Link>
      <Link to="/team">Team</Link>
      <Button><Link to="/signin">Sign In</Link></Button>
      <Button><Link to="/signup">Sign Up</Link></Button>
    </div>
  );
}

export default Nav;