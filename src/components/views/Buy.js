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
  let newSum = (cash - (newStock.amount * newStock.price)).toFixed(2)


const newPriceAggregated = (currPrice, prevPrice,currAmount,prevAmount) => {
  Number(currPrice, prevPrice,currAmount,prevAmount)
    let currTotal = currPrice * currAmount
    let prevTotal = prevPrice * prevAmount
    let totalShares = currAmount + prevAmount
    let totalPrice = (currTotal + prevTotal) / totalShares
    return [totalPrice.toFixed(2), totalShares]

}
  const buyStocks = (e) => {
    e.preventDefault();

    let message = `You have successfully purchased ${newStock.amount} share(s) of ${newStock.stock_symbol} for $${(newStock.price * newStock.amount).toFixed(2)}.`

    if (newSum < 0) {
      return errorMessage(`You do not have sufficient funds in your account. Current cash balance of $${cash}.`)
    } else if (stock.length > 0) {
      let newValues = newPriceAggregated(newStock.price, stock[0].price, Number(newStock.amount), stock[0].amount)
      newStock.amount = Number(newValues[1])
      newStock.price = Number(newValues[0])
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
      <label className="post-balance">
        <h2>Post Balance</h2>
        ${newSum}
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
