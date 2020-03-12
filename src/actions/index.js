import axios from 'axios';
import { axiosWithAuth } from '../components/utils/axiosAuth';

export const FETCH_ALL_STOCKS = 'FETCH_ALL_STOCKS';
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export const UPDATE_STOCK_DATA_SUCCESS = 'UPDATE_STOCK_DATA_SUCCESS';

export const BUY_STOCK = 'BUY_STOCK';
export const SELL_STOCK = 'SELL_STOCK';

export const ADD_WATCH_LIST = 'ADD_WATCH_LIST';

export const ERROR = 'ERROR';

export const fetchAll = () => dispatch => {
  dispatch({ type: FETCH_ALL_STOCKS });
  axiosWithAuth() // first grab user data from db
    .get('/user')
    .then(res => {
      console.log(res)
      dispatch({ type: FETCH_USER_SUCCESS, payload: res.data })
    })
    .then(() => // then chain a promise to the fetch user and fetch stock data and update the state.
      axios
      .get('https://financialmodelingprep.com/api/v3/stock/real-time-price')
      .then(res => {
        dispatch({ type: FETCH_ALL_SUCCESS, payload: res.data })
        dispatch({ type: UPDATE_PORTFOLIO })
      }))
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
    })
}

export const updateStockDB = (data) => dispatch => {
  axios
    .post('http://localhost:5000/stocks', data)
    .then(res => {
      dispatch({ type: UPDATE_STOCK_DATA_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
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

export const addWatchList = (data) => {
  return {
    type: ADD_WATCH_LIST,
    payload: { ...data }
  }
}