import axios from 'axios';

export const FETCH_STOCK_START = 'FETCH_STOCK_START';
export const FETCH_STOCK_SUCCESS = 'FETCH_STOCK_SUCCESS';
export const ERROR = 'ERROR';

export const fetchStock = () => dispatch => {
  dispatch({ type: FETCH_STOCK_START });
  axios
    .get('https://financialmodelingprep.com/api/v3/stock/real-time-price/AAPL')
    .then(res => {
      console.log(res.data)
      dispatch({ type: FETCH_STOCK_SUCCESS, payload: res.data})
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err
      })
    })
}