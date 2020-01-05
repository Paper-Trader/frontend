import React from 'react';
import SideNav from "../nav/SideNav";
import Dashboard from '../views/Dashboard';

function HomeUser() {
  return (
    <div className="homeuser">
      <SideNav />
      <Dashboard />
    </div>
  );
}

export default HomeUser;
