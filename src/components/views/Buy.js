import React, { useState } from "react";
import { connect } from 'react-redux';
import { buyStock } from '../../actions';

function BuyStock(props) {
  const initialStock = {
    symbol: props.company,
    price: parseFloat(props.currPrice[props.currPrice.length - 1]["4. close"]),
    amount: 0,
  };

  const [newStock, setNewStock] = useState(initialStock);

  const buyStock = (e) => {
    e.preventDefault();
    props.buyStock(newStock)
  }

  const onChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      setNewStock({
        ...newStock,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <div >
      <form onSubmit={buyStock}>
        <label>
          Shares of {newStock.symbol}:
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
            EST COST = ${(newStock.amount * newStock.price).toFixed(2)}
        </label>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

export default connect(null, { buyStock })(BuyStock);
