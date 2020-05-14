import axios from 'axios';
import { axiosWithAuth } from '../components/utils/axiosAuth';

export const FETCH_ALL_STOCKS = 'FETCH_ALL_STOCKS';
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export const UPDATE_STOCK_DATA_SUCCESS = 'UPDATE_STOCK_DATA_SUCCESS';
export const UPDATE_CASH = 'UPDATE_CASH';

export const ADD_WATCH_LIST_START = 'ADD_WATCH_LIST_START';
export const ADD_WATCH_LIST_SUCCESS = 'ADD_WATCH_LIST_SUCCESS';

export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const fetchAll = () => dispatch => {
  dispatch({ type: FETCH_ALL_STOCKS });
  axiosWithAuth() // first grab user data from db
    .get('/user')
    .then(res => {
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

export const updateCash = (data) => dispatch => {
  axiosWithAuth() 
    .put('/portfolio/cash', data)
    .then(() => 
      dispatch({ type: UPDATE_CASH, payload: data })
    )
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
    })
}

export const buyStock = (data, message) => dispatch => {
  axiosWithAuth() 
    .post('/portfolio/buy', data)
    .then(() => {
      dispatch({ type: SUCCESS, payload: message })
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
    })
}

export const buyExistingStock = (data, message) => dispatch => {
  axiosWithAuth() 
    .put('/portfolio/buy', data)
    .then(() => {
      dispatch({ type: SUCCESS, payload: message })
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
    })
}

export const sellPartialStock = (data, message) => dispatch => {
  axiosWithAuth() 
    .put('/portfolio/sell', data)
    .then(() => {
      dispatch({ type: SUCCESS, payload: message })
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
    })
}

export const sellStock = (stock, message) => dispatch => {
  axiosWithAuth() 
    .delete('/portfolio/sell', { data: {stock_symbol: stock.stock_symbol}})
    .then(() => {
      dispatch({ type: SUCCESS, payload: message })
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
    })
}

export const addToWatchList = (data) => dispatch => {
  dispatch({ type: ADD_WATCH_LIST_START });
  axiosWithAuth()
    .post('/watchlist', data)
    .then(res => {
      dispatch({ type: ADD_WATCH_LIST_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: ERROR, payload: err })
    })
}

export const errorMessage = (message) => {
  return {
    type: ERROR,
    payload: message
  }
}