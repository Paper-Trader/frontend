import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button } from "semantic-ui-react";
import { sellStock, updateCash, sellPartialStock, errorMessage } from '../../actions';

function SellStock({ 
  stocks, 
  company, 
  currPrice, 
  sellStock, 
  updateCash, 
  errorMessage,
  cash, 
  sellPartialStock 
}) {

  const stock = stocks.filter(stock => company === stock.symbol)
  let initialStock = {
    stock_symbol: company,
    price: parseFloat(currPrice[currPrice.length - 1]["4. close"]),
    amount: 0,
  };

  const [newStock, setNewStock] = useState(initialStock);
  let newSum = (cash + (newStock.amount * newStock.price)).toFixed(2)

  const sellStocks = (e) => {
    e.preventDefault();
    let message = `You have successfully sold ${newStock.amount} shares of ${newStock.stock_symbol} for $${(newStock.price * newStock.amount).toFixed(2)}.`

    if (stock.length < 1) {
      errorMessage(`You don't own any shares of ${company}.`)
    } else if (stock[0].amount < newStock.amount) {
      errorMessage(`You only own ${stock[0].amount} shares of ${company}. ${newStock.amount - stock[0].amount} too many.`)
    } else if (stock[0].amount !== parseInt(newStock.amount)) {
      newStock.amount = stock[0].amount - newStock.amount
      updateCash({cash: newSum})
      sellPartialStock(newStock, message)
      setNewStock({
        ...newStock,
        amount: 0
      })
    } else if (stock[0].amount === parseInt(newStock.amount)) {
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

  if (stock.length > 0) {
    return (
      <form onSubmit={sellStocks} className="sell-container">
        <h2 className="sell-name">Sell {newStock.stock_symbol}</h2>
        <label className="shares-label">
          Shares
          <input 
            type="number"
            min="1"
            name="amount"
            onChange={onChange}
            className="shares-input"
            defaultValue={stock[0].amount}
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
        <label className="post-balance">
          <h2>Post Balance</h2>
          ${newSum}
        </label>
        <Button 
          size="small" 
          type="submit"
          className="sell-button"
        >Sell</Button>
      </form>
    );
  } else {
    return <></>
  }
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cash: state.cash,
  isFetching: state.isFetching,
})

export default connect(
  mapStateToProps, { 
    sellStock, 
    updateCash, 
    errorMessage,
    sellPartialStock
  }
)(SellStock);