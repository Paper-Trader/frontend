import React, { useState } from "react";
import { connect } from 'react-redux';
import { buyStock } from '../actions';
import SellStock from './Sell';

const initialStock = {
  symbol: 'AAPL',
  price: 300,
  amount: 0,
};

function BuyStock(props) {
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
        <legend>{newStock.symbol}</legend>
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
            EST COST = {newStock.amount * newStock.price}
        </label>
        <div>
          <button type="submit">Buy</button>
        </div>
      </form>

      <SellStock />
    </div>
  );
};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { buyStock })(BuyStock);
