import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import logo from '../assets/logo.svg'

function SideNav() {
  return (
    <div className="side-nav" >
      <Link to="/">DASHBOARD</Link>
      <Link to="/watchlist">WATCHLIST</Link>
      <Link to="/browse">BROWSE</Link>
    </div>
  );
}

export default SideNav;
