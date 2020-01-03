import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAll } from "../actions";

import { Header, Divider } from "semantic-ui-react";
import PortfolioChart from "./PortfolioChart";
import PortfolioList from "./PortfolioList";

function Dashboard(props) {
  useEffect(() => {
    props.fetchAll();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-breakdown">
        <Header as="h5">Aggregated Activity</Header>
        <Header as="h2">${props.value}</Header>
        <Header as="h4">
          {props.dailyChange} (%{props.dailyPercent})
        </Header>
        <PortfolioChart />
      </div>

      <Divider />
      <div className="dashboard-listing">
        <Header as="h5">Portfolio Stock Listing</Header>
        <PortfolioList />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  value: state.valueCurr,
  dailyChange: state.dailyChange,
  dailyPercent: state.dailyPercentChange
});

export default connect(mapStateToProps, { fetchAll })(Dashboard);
