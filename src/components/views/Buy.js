import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Button } from "semantic-ui-react";
import { buyStock, buyExistingStock, updateCash, fetchAll, errorMessage } from '../../actions';

function BuyStock({ 
  buyStock, 
  buyExistingStock, 
  updateCash, 
  fetchAll, 
  stocks, 
  company, 
  currPrice, 
  cash,
  errorMessage
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
    let message = `You have successfully purchased ${newStock.amount} shares of ${newStock.stock_symbol} for $${(newStock.price * newStock.amount).toFixed(2)}.`
    console.log(newSum)

    if (newSum < 0) {
      return errorMessage(`You do not have sufficient funds in your account. Current cash balance of $${cash}.`)
    } else if (stock.length > 0) {
      newStock.amount = parseInt(newStock.amount) + stock[0].amount
      updateCash({cash: newSum})
      buyExistingStock(newStock, message)
      setNewStock({
        ...newStock,
        amount: 0
      })
    } else {
      updateCash({cash: newSum})
      buyStock(newStock, message)
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
    <form onSubmit={buyStocks} className="buy-container">
      <h2 className="buy-name">Buy {newStock.stock_symbol}</h2>
      <label className="shares-label">
        <h2>Shares</h2>
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
        className="buy-button"
      >Buy</Button>
    </form>
  );
};

const mapStateToProps = state => ({
  stocks: state.portfolio.stocks,
  cash: state.cash,
})

export default connect(
  mapStateToProps, { 
    buyStock, 
    buyExistingStock, 
    updateCash, 
    fetchAll,
    errorMessage
  }
)(BuyStock);
