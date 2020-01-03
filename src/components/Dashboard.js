import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PortfolioChart from './PortfolioChart';
import { fetchAll } from '../actions';

function Dashboard(props) {
  useEffect(() => {
    props.fetchAll()
  }, []);

  return (
    <div>
      <h2>${props.value}</h2>
      <h4>{props.dailyChange} (%{props.dailyPercent})</h4>
      <PortfolioChart />
      <div>
        <h3>Stock List</h3>
        <Link to='/stock/'>Single Stock</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  value: state.valueCurr,
  dailyChange: state.dailyChange,
  dailyPercent: state.dailyPercentChange
})

export default connect(mapStateToProps, {fetchAll})(Dashboard);