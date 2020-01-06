import React from "react";
import { connect } from "react-redux";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import SideNav from "../nav/SideNav";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

// const data = [
//   { symbol: "APPL", time: "9:00 AM", price: 2.34 },
//   { symbol: "GOOG", time: "10:00 AM", price: 5.09 },
//   { symbol: "AMZN", time: "11:00 AM", price: 3.5 },
//   { symbol: "FB", time: "12:00 AM", price: 3.8 },
//   { symbol: "SPY", time: "1:00 AM", price: 3.75 },
//   { symbol: "COST", time: "2:00 AM", price: 4.02 },
//   { symbol: "TGT", time: "3:00 AM", price: 3.2 },
//   { symbol: "FIT", time: "4:00 AM", price: 4.68 }
// ];

function WatchList(props) {
  return (
    <div className="watchlist-container">
      <SideNav />
      <div className="watchlist-content">
        <Header as="h5">Watchlist</Header>
        <div className="watchlist-content-noheader">
          {/* <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <XAxis
              dataKey="time"
              hide={true}
              domain={["priceMin", "priceMax"]}
            />
            <YAxis />
            <Tooltip />
            <Line
              connectNulls
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </LineChart> */}
          <div className="watchlist-list">
            {props.watchList.map(stock => (
              <div key={stock.symbol} className="stock-wrapper">
                <Link to="/stock/">
                  <div className="stock">
                    <div className="stock-header">
                      <Header as="h2">{stock.symbol}</Header>
                    </div>
                    <Header as="h3">${stock.price}</Header>
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
  watchList: state.watchList
})

export default connect(mapStateToProps, {})(WatchList);
