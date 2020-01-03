import React, { useState } from "react";
import { connect } from 'react-redux';
import { buyStock } from '../actions';

const initialStock = {
  symbol: 'AAPL',
  price: 300,
  amount: 0
};

function BuyStock(props) {
  const [newStock, setNewStock] = useState(initialStock);

  const buyStock = (e) => {
    e.preventDefault();
    props.buyStock(newStock)
  }

  return (
    <div >
      <form onSubmit={buyStock}>
        <legend>{newStock.symbol}</legend>
        <label>
          Shares of {newStock.symbol}:
          <input
            onChange={e =>
              setNewStock({ ...newStock, amount: parseInt(e.target.value) })
            }
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
    </div>
  );
};

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps, { buyStock })(BuyStock);