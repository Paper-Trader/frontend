import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAll } from "../../actions";
import { Header, Divider } from "semantic-ui-react";

function Dashboard({ portfolio, stocks }) {

  return (
    <div className="portfoliolist">
      {stocks.map(stock => (
        <div key={stock.symbol}>
          <Link to="/stock/">
            <div className="stock">
              <div className="stock-header">
                <Header as="h2">{stock.symbol}</Header>
                <Header as="h6">{stock.amount} shares</Header>
              </div>
              <Header as="h3">${stock.price}</Header>
            </div>
          </Link>
          <Divider />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(mapStateToProps, { fetchAll })(Dashboard);
