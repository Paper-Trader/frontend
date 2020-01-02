import * as actionType from '../actions';

const initialState = {
  stock: {
    symbol: '',
    price: 0
  },
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