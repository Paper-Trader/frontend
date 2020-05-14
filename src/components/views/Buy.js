import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { buyStock, buyExistingStock, updateCash, fetchAll } from '../../actions';

function BuyStock({ 
  buyStock, 
  buyExistingStock, 
  updateCash, 
  fetchAll, 
  stocks, 
  company, 
  currPrice, 
  cash, 
  isFetching 
}) {
  useEffect(() => {
    fetchAll()
  }, [fetchAll]);

  const stock = stocks.filter(stock => company === stock.symbol)
  const initialStock = {
    stock_symbol: company,
    price: parseFloat(currPrice[currPrice.length - 1]["4. close"]),
    amount: 0,
  };

  const [newStock, setNewStock] = useState(initialStock);

  const buyStocks = (e) => {
    e.preventDefault();

    let newSum = (cash - (newStock.amount * newStock.price)).toFixed(2)
    console.log(newSum)

    if (newSum < 0) {
      alert(`You do not have sufficient funds in your account. Current cash balance of $${cash}.`)
    } else if (stock.length > 0) {
      newStock.purchasedAmount = parseInt(newStock.amount)
      newStock.amount = parseInt(newStock.amount) + stock[0].amount
      updateCash({cash: newSum})
      buyExistingStock(newStock)
      setNewStock({
        ...newStock,
        amount: 0
      })
    } else {
      newStock.purchasedAmount = parseInt(newStock.amount)
      updateCash({cash: newSum})
      buyStock(newStock)
      setNewStock({
        ...newStock,
        amount: 0
      })
    }
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

  if (isFetching) {
    return <div>Loading your stocks...</div>
  }

  return (
    <div >
      <form onSubmit={buyStocks}>
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
            at {newStock.price.toFixed(2)} 
        </label>
        <label>
            Total: ${(newStock.amount * newStock.price).toFixed(2)}
        </label>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cash: state.cash,
  isFetching: state.isFetching
})

export default connect(
  mapStateToProps, { 
    buyStock, 
    buyExistingStock, 
    updateCash, 
    fetchAll 
  }
)(BuyStock);
