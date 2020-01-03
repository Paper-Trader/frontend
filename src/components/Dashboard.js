import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PortfolioChart from './PortfolioChart';

function Dashboard(props) {
  return (
    <div>
      <h2>{props.value}</h2>
      <h4>Daily Change (Percent)</h4>
      <PortfolioChart />
      <div>
        <h3>Watchlist</h3>
        <Link to='/stock/'>Stock</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  value: state.value
})

export default connect(mapStateToProps, {})(Dashboard);