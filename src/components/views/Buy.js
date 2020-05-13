import React, { useState } from "react";
import { connect } from 'react-redux';
import { buyStock, buyExistingStock, updateCash } from '../../actions';

function BuyStock(props) {
  const stock = props.stocks.filter(stock => props.company === stock.symbol)
  const initialStock = {
    stock_symbol: props.company,
    price: parseFloat(props.currPrice[props.currPrice.length - 1]["4. close"]),
    amount: 0,
  };

  const [newStock, setNewStock] = useState(initialStock);

  const buyStock = (e) => {
    e.preventDefault();
    let cash = (props.cash - (newStock.amount * newStock.price)).toFixed(2)
    console.log(cash)
    if (isNaN(newStock.amount)) {
      alert('Amount required')
    } else if (props.cash < (newStock.amount * newStock.price)) {
      alert(`You do not have sufficient funds in your account. Current cash balance of $${props.cash}.`)
    } else if (stock.length > 0) {
      newStock.amount = parseInt(newStock.amount) + stock[0].amount
      props.updateCash({cash: cash})
      props.buyExistingStock(newStock)
    } else {
      props.updateCash({cash: cash})
      props.buyStock(newStock)
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
      <form onSubmit={buyStock}>
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
  cash: state.cash
})

export default connect(mapStateToProps, { buyStock, buyExistingStock, updateCash })(BuyStock);
