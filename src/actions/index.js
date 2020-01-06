import axios from 'axios';

export const FETCH_STOCK_START = 'FETCH_STOCK_START';
export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';

export const FETCH_ALL_STOCKS = 'FETCH_ALL_STOCKS';
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';

export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';

export const BUY_STOCK = 'BUY_STOCK';
export const SELL_STOCK = 'SELL_STOCK';

export const ERROR = 'ERROR';

export const fetchStock = () => dispatch => {
  dispatch({ type: FETCH_STOCK_START });
  axios
    .get('https://financialmodelingprep.com/api/v3/stock/real-time-price/AAPL')
    .then(res => {
      dispatch({ type: FETCH_STOCK_SUCCESS, payload: res.data})
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err
      })
    })
}

export const fetchAll = () => dispatch => {
  dispatch({ type: FETCH_ALL_STOCKS });
  axios
    .get('https://financialmodelingprep.com/api/v3/stock/real-time-price')
    .then(res => {
      dispatch({ type: FETCH_ALL_SUCCESS, payload: res.data })
      dispatch({ type: UPDATE_PORTFOLIO })
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err
      })
    })
}

export const buyStock = (data) => {
  return {
    type: BUY_STOCK,
    payload: { ...data }
  }
}

export const sellStock = (data) => {
  return {
    type: SELL_STOCK,
    payload: { ...data }
  }
}