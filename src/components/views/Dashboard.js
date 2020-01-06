import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAll } from "../../actions";
import { Header } from "semantic-ui-react";
import PortfolioChart from "../portfolio/PortfolioChart";
import PortfolioList from "../portfolio/PortfolioList";

function Dashboard({value, dailyChange, dailyPercent, stocks, fetchAll}) {
  useEffect(() => {
    fetchAll() // fetches first data
    setInterval(() => { // runs every 60 seconds
      fetchAll() // fetching data once per cycle and updates portfolio
    }, 60 * 1000);
  }, [fetchAll]);

  return (
    <div className="dashboard">
      <div className="dashboard-breakdown">
        <Header as="h5">Aggregated Daily Activity</Header>
        <Header as="h2">${value}</Header>
        <Header as="h4">
          {dailyChange} ({dailyPercent}%)
        </Header>
        <PortfolioChart />
      </div>
      <div className="dashboard-listing">
        <Header as="h5">Portfolio Stock Listing</Header>
        <PortfolioList stocks={stocks} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  value: state.valueCurr,
  dailyChange: state.dailyChange,
  dailyPercent: state.dailyPercentChange,
  stocks: state.portfolio.stocks
});

export default connect(mapStateToProps, { fetchAll })(Dashboard);
