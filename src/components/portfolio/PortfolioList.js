import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAll } from "../../actions";
import { Header } from "semantic-ui-react";

function PortfolioList({ stocks, isFetching }) {
  if (isFetching) {
    return <div>Loading...</div>
  }
  return (
    <div className="portfoliolist">
      {stocks.map(stock => (
        <div key={stock.symbol} className="stock-wrapper">
          <Link to={() => `/stock/${stock.symbol}`} >
            <div className="stock">
              <div className="stock-header">
                <Header as="h2">{stock.symbol}</Header>
                <Header as="h6">{stock.amount} shares</Header>
              </div>
              <Header as="h3">${stock.price.toFixed(2)}</Header>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  portfolio: state.portfolio,
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, { fetchAll })(PortfolioList);
