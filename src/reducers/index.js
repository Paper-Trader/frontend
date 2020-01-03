import * as actionType from '../actions';

const initialState = {
  portfolio: {
    cash: 515,
    stocks: [
      {
        symbol: 'MU',
        price: 60.37,
        amount: 3
      },
      {
        symbol: 'AAPL',
        price: 300.28,
        amount: 5
      },
      {
        symbol: 'MSFT',
        price: 160.52,
        amount: 2
      },
    ]
  },
  valueInitial: 2500,
  valueCurr: 0,
  isFetching: false,
  dailyChange: 0,
  dailyPercentChange: 0,
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
        valueCurr: Math.round((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => acc + (val.price * val.amount), 0)) * 100) / 100,
        dailyChange: Math.round(((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => acc + (val.price * val.amount), 0)) - state.valueInitial) * 100) / 100,
        dailyPercentChange: Math.round((Math.round((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => acc + (val.price * val.amount), 0)) * 100) / 100 / Math.round(((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => acc + (val.price * val.amount), 0)) - state.valueInitial) * 100) / 100) * 100) / 100
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