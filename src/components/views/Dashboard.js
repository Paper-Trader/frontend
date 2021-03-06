import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAll } from "../../actions";
import { Header } from "semantic-ui-react";
import PortfolioList from "../portfolio/PortfolioList";
import Loader from "react-loader-spinner";
import PieChartComponent from "./PieChart"

function Dashboard({stocks, fetchAll, cash, dailyInitial, isFetching }) {
  useEffect(() => {
    fetchAll() // fetches first data
    setInterval(() => { // runs every 60 seconds
      fetchAll() // fetching data once per cycle and updates portfolio
    }, 60 * 1000000);
  }, [fetchAll]);

  let value = (cash + stocks.reduce((acc, val) => acc + (val.price * val.amount), 0)).toFixed(2)
  let dailyChange = value - dailyInitial
  let dailyPercent = (((value / dailyInitial) - 1)*100)

  if (isFetching) {
    return(
      <div>
        <h1>Fetching your user data</h1>
        <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
      </div>
    ) 
  }

  return (
    <div className="dashboard">
      <div className="dashboard-breakdown">
        <Header as="h5">Aggregated Daily Activity</Header>
        <Header as="h2"
          style={{ color: "black" }}>
          ${value}
        </Header>
        <Header as="h4"
          style={{ color: "black" }}>
          ${cash.toFixed(2)} cash
        </Header>
        <Header as="h4"
          style={
            dailyChange.toString().includes("-") ?
            { color: "#DC4A7F" } : 
            { color: "#00D1C5" }
          }>
          {dailyChange.toString().includes("-") ? '$' : '+$' }{dailyChange.toFixed(2)} ({dailyPercent.toFixed(2)}%)
        </Header>
        <PieChartComponent />
      </div>
      <div className="dashboard-listing">
        <Header as="h5">Portfolio Stock Listing</Header>
        <PortfolioList/>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  cash: state.cash,
  dailyInitial: state.dailyInitial,
  stocks: state.portfolio.stocks,
  stockList: state.stockList,
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, { fetchAll })(Dashboard);
