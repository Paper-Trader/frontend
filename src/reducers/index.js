import * as actionType from '../actions';

const initialState = {
  portfolio: {
    stocks: []
  },
  stockList: [],
  watchList: [],
  cash: 0,
  dailyInitial: 10000,
  valueCurr: 0,
  dailyChange: 0,
  dailyPercentChange: 0,
  success: '',
  error: '',
  isFetching: false,
  isAdding: false
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.FETCH_USER_SUCCESS:
      return {
        ...state,
        cash: action.payload.cash,
        portfolio: {
          stocks: [...action.payload.portfolio]
        },
        watchList: [...action.payload.watchlist],
      }
    case actionType.FETCH_ALL_STOCKS:
      return {
        ...state,
        isFetching: true,
      }
    case actionType.FETCH_ALL_SUCCESS:
      const stockData = action.payload.stockList
      return {
        ...state,
        stockList: stockData,
        portfolio: {
          stocks: state.portfolio.stocks.map(val => {
            return {
              ...val,
              price: stockData[stockData.findIndex(x => x.symbol === val.symbol)].price
            }
          })
        },
        watchList: state.watchList.map(val => {
            return {
              ...val,
              price: stockData[stockData.findIndex(x => x.symbol === val.symbol)].price
            }
          }),
      }
    case actionType.UPDATE_PORTFOLIO:
      let currPort = (state.cash + state.portfolio.stocks.reduce((acc, val) => acc + (val.price * val.amount), 0))
      return {
        ...state,
        valueCurr: currPort.toFixed(2),
        dailyChange: (currPort - state.dailyInitial).toFixed(2),
        dailyPercentChange: ((currPort - state.dailyInitial) / 100).toFixed(2),
        isFetching: false,
      }
    case actionType.ERROR:
      console.log(action.payload)
      return {
        ...state,
        error: action.payload,
      }
    case actionType.SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        success: action.payload,
      }
    default:
      return state;
  }
}