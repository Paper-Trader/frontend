import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'

function Nav() {
  return (
    <div>
      <Link to="/">Logo Image</Link>
      <Link to="/about">About</Link>
      <Link to="/team">Team</Link>
      <Button><Link to="/signin">Sign In</Link></Button>
      <Button><Link to="/signup">Sign Up</Link></Button>
    </div>
  );
}

export default Nav;