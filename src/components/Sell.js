import React, { useState } from "react";
import { connect } from 'react-redux';
// import { sellStock } from '../actions';

const initialStock = {
  symbol: 'AAPL',
  price: 300,
  amount: 0,
};

function SellStock(props) {
  const [newStock, setNewStock] = useState(initialStock);

  const sellStock = (e) => {
    e.preventDefault();
    props.sellStock(newStock)
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
      <form onSubmit={sellStock}>
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
          <button type="submit">Sell</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps, {  })(SellStock);