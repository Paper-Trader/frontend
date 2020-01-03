import * as actionType from '../actions';

const initialState = {
  stock: {
    symbol: '',
    price: 0
  },
  portfolio: {
    cash: 2500,
    stocks: [
      {
        symbol: '',
        price: 0,
        amount: 0
      }
    ]
  },
  value: 2500,
  isFetching: false
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.FETCH_STOCK_START:
      return {
        ...state,
        error: '',
        isFetching: true,
      }
    case actionType.FETCH_STOCK_SUCCESS:
      return {
        ...state,
        error: '',
        stock: {
          symbol: action.payload.symbol,
          price: action.payload.price
        },
        isFetching: false,
      }
    case actionType.FETCH_ALL_STOCKS:
      return {
        ...state,
        error: '',
        isFetching: true,
      }
    case actionType.FETCH_ALL_SUCCESS:
      return {
        ...state,
        error: '',
        symbolsList: action.payload.symbolsList,
        isFetching: false,
      }
    case actionType.ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }
    default:
      return state;
  }
}