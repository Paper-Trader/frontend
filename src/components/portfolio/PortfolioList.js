import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAll } from "../../actions";
import { Header } from "semantic-ui-react";

function PortfolioList(props) {
  return (
    <div className="portfoliolist">
      {props.stocks.map(stock => (
        <div key={stock.symbol} className="stock-wrapper">
          <Link to={location => `/stock/${stock.symbol}`} >
            <div className="stock">
              <div className="stock-header">
                <Header as="h2">{stock.symbol}</Header>
                <Header as="h6">{stock.amount} shares</Header>
              </div>
              <Header as="h3">${stock.price}</Header>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, { fetchAll })(PortfolioList);
