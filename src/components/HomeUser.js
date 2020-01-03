import React from 'react';
import SideNav from "./SideNav";
import Dashboard from './Dashboard';

function HomeUser() {
  return (
    <div className="homeuser">
      <SideNav />
      <Dashboard />
    </div>
  );
}

export default HomeUser;
