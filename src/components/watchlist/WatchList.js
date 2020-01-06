import React from "react";
import { connect } from "react-redux";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import SideNav from "../nav/SideNav";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
                <Link to={`/stock/${stock.symbol}`}>
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
