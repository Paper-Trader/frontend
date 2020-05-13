import React, { useState } from "react";
import { connect } from 'react-redux';
import { buyStock, buyExistingStock } from '../../actions';

function BuyStock(props) {
  const stock = props.stocks.filter(stock => props.company === stock.symbol)
  const initialStock = {
    stock_symbol: props.company,
    price: parseFloat(props.currPrice[props.currPrice.length - 1]["4. close"]),
    amount: 0,
  };

  const [newStock, setNewStock] = useState(initialStock);

  const buyStock = (e) => {
    e.preventDefault();

    if (stock.length > 0) {
      newStock.amount += stock[0].amount
      props.buyExistingStock(newStock)
    } else {
      props.buyStock(newStock)
    }
  }

  const onChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      setNewStock({
        ...newStock,
        [e.target.name]: parseInt(e.target.value)
      })
    }
  }

  return (
    <div >
      <form onSubmit={buyStock}>
        <label>
          Shares of {newStock.stock_symbol}:
          <input
            type="number"
            min="1"
            name="amount"
            onChange={onChange}
            value={newStock.amount}
          />
        </label>
        <label>
            Market Price x {newStock.price}
        </label>
        <label>
            EST COST = ${(newStock.amount * newStock.price)}
        </label>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cash: state.cash
})

export default connect(mapStateToProps, { buyStock, buyExistingStock })(BuyStock);
