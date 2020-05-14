import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
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
    console.log('Cash', newSum)
    console.log('Current Stock', stock[0])
    console.log('New Stock', newStock)

    if (stock[0].amount !== parseInt(newStock.amount)) {
      newStock.soldAmount = parseInt(newStock.amount)
      newStock.amount = stock[0].amount - newStock.amount
      console.log(newStock)
      // updateCash({cash: newSum})
      // sellPartialStock(newStock)
      // setNewStock({
      //   ...newStock,
      //   amount: 0
      // })
      alert('diff amount')
    } else {
      newStock.soldAmount = parseInt(newStock.amount)
      updateCash({cash: newSum})
      sellStock(newStock)
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
    <div >
      <form onSubmit={sellStocks}>
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
        <button type="submit">Sell</button>
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
    sellStock, 
    updateCash, 
    fetchAll,
    sellPartialStock
  }
)(SellStock);