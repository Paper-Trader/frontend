import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAll } from "../../actions";
import { Header } from "semantic-ui-react";
import PortfolioChart from "../portfolio/PortfolioChart";
import PortfolioList from "../portfolio/PortfolioList";

function Dashboard({value, dailyChange, dailyPercent, stocks, fetchAll }) {
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
        <Header as="h2"
          style={
            dailyChange.toString().includes("-") ?
            { color: "#DC4A7F" } : 
            { color: "#00D1C5" }
          }>
          ${value}
        </Header>
        <Header as="h4"
          style={
            dailyChange.toString().includes("-") ?
            { color: "#DC4A7F" } : 
            { color: "#00D1C5" }
          }>
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
  stocks: state.portfolio.stocks,
  stockList: state.stockList
});

export default connect(mapStateToProps, { fetchAll })(Dashboard);
