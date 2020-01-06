import React, { useState } from "react";
import { connect } from 'react-redux';
import { sellStock } from '../../actions';

function SellStock(props) {
  let stock = props.stocks.filter(stock => props.company === stock.symbol)

  let initialStock = {
    symbol: props.company,
    price: parseInt(props.currPrice[props.currPrice.length - 1]["4. close"]).toFixed(2),
    amount: stock[0].amount,
  };
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
        <button type="submit">Sell</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks
})

export default connect(mapStateToProps, { sellStock })(SellStock);