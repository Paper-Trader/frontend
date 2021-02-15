import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAll } from "../../actions";
import { Header } from "semantic-ui-react";
import Loader from "react-loader-spinner";

function PortfolioList({ isFetching, portfolio }) {
  if (isFetching) {
    return <Loader type="BallTriangle" color="#00BFFF" height={100} width={100} />
  }
  return (
    <div className="portfoliolist">
      {portfolio.stocks.map(stock => (
        <div key={stock.symbol} className="stock-wrapper">
          <Link to={() => `/stock/${stock.symbol}`} >
            <div className="stock">
              <div className="stock-header">
                <Header as="h2">{stock.symbol}</Header>
                <Header as="h6">{stock.amount} shares at ${stock.purchased}</Header>
              </div>
              <div className="stock-footer" >
                <Header as="h3">${stock.price.toFixed(2)}</Header>
                <Header as="h3" style={
                  (stock.price-stock.purchased).toFixed(2) < 0 ?
                  { color: "#DC4A7F" } :
                  { color: "#00D1C5" }
                }>
                  {
                    ((stock.price-stock.purchased).toFixed(2) < 0) ?
                    `-$${Math.abs((stock.price-stock.purchased)).toFixed(2)}` :
                    `+$${(stock.price-stock.purchased).toFixed(2)}`
                  }</Header>
              </div>
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
