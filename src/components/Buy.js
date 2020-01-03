import React, { useState } from "react";
import { connect } from 'react-redux';

const initialStock = {
  symbol: 'APPL',
  price: 300,
  amount: 0
};

function BuyStock(props) {
  const [newStock, setNewStock] = useState(initialStock);

  return (
    <div >
      <form>
        <legend>{newStock.symbol}</legend>
        <label>
          Shares of {newStock.symbol}:
          <input
            onChange={e =>
              setNewStock({ ...newStock, amount: e.target.value })
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

export default connect(mapStateToProps, {})(BuyStock);