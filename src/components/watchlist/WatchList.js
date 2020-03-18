import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import SideNav from "../nav/SideNav";
import { Header } from "semantic-ui-react";
import { fetchAll } from "../../actions";
import { Link } from "react-router-dom";

function WatchList({ isFetching, watchList, fetchAll}) {
  console.log(watchList, isFetching)
  useEffect(() => {
    fetchAll() // fetches first data
    setInterval(() => { // runs every 60 seconds
      fetchAll() // fetching data once per cycle and updates portfolio
    }, 60 * 1000);
  }, [fetchAll]);

  if (isFetching) {
    return <div>Loading Watchlist...</div>
  }
  return (
    <div className="watchlist-container">
      <SideNav />
      <div className="watchlist-content">
        <Header as="h5">Watchlist</Header>
        <div className="watchlist-content-noheader">
          <div className="watchlist-list">
            {watchList.map(stock => (
              <div key={stock.symbol} className="stock-wrapper">
                <Link to={`/stock/${stock.symbol}`}>
                  <div className="stock">
                    <div className="stock-header">
                      <Header as="h2">{stock.symbol}</Header>
                    </div>
                    <Header as="h3">${stock.price.toFixed(2)}</Header>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  watchList: state.watchList,
  isFetching: state.isFetching,
})

export default connect(mapStateToProps, { fetchAll })(WatchList);
