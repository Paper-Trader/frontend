import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Button } from "semantic-ui-react";
import { sellStock, updateCash, fetchAll, sellPartialStock } from '../../actions';

function SellStock({ 
  stocks, 
  company, 
  currPrice, 
  sellStock, 
  updateCash, 
  fetchAll, 
  cash, 
  sellPartialStock 
}) {
  useEffect(() => {
    fetchAll()
  }, [fetchAll]);

  const stock = stocks.filter(stock => company === stock.symbol)
  let initialStock = {
    stock_symbol: company,
    price: parseFloat(currPrice[currPrice.length - 1]["4. close"]),
    amount: 0,
  };

  const [newStock, setNewStock] = useState(initialStock);

  const sellStocks = (e) => {
    e.preventDefault();

    let newSum = (cash + (newStock.amount * newStock.price)).toFixed(2)
    let message = `You have successfully sold ${newStock.amount} shares of ${newStock.stock_symbol} for $${(newStock.price * newStock.amount).toFixed(2)}.`
    console.log(newSum)

    if (stock[0].amount !== parseInt(newStock.amount)) {
      newStock.amount = stock[0].amount - newStock.amount
      updateCash({cash: newSum})
      sellPartialStock(newStock, message)
      setNewStock({
        ...newStock,
        amount: 0
      })
    } else {
      updateCash({cash: newSum})
      sellStock(newStock, message)
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

  return (
    <form onSubmit={sellStocks} className="sell-container">
      <h2 className="sell-name">Sell {newStock.stock_symbol}</h2>
      <label className="shares-label">
        Shares of {newStock.stock_symbol}:
        <input 
          type="number"
          min="1"
          name="amount"
          onChange={onChange}
          className="shares-input"
          value={newStock.amount}
        />
      </label>
      <label className="market-price">
        <h2>Market Price</h2>
        ${newStock.price.toFixed(2)} 
      </label>
      <label className="estimated-cost">
        <h2>Estimated Cost</h2>
        ${(newStock.amount * newStock.price).toFixed(2)}
      </label>
      <Button 
        size="small" 
        type="submit"
        className="sell-button"
      >Sell</Button>
    </form>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cash: state.cash,
})

export default connect(
  mapStateToProps, { 
    sellStock, 
    updateCash, 
    fetchAll,
    sellPartialStock
  }
)(SellStock);