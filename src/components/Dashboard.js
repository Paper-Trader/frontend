import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Investing</h2>
      <h2>$2,314.41</h2>
      <h4>Daily Change (Percent)</h4>
      <div>Chart</div>
      <div>
        <h3>Watchlist</h3>
        <Link to='/stock/'>Stock</Link>
      </div>
    </div>
  );
}

export default Dashboard;