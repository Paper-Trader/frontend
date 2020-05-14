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
    case actionType.BUY_STOCK:
      return {
        ...state,
        success: `You have successfully purchased ${action.payload.purchasedAmount} shares of ${action.payload.stock_symbol} for $${(action.payload.price * action.payload.purchasedAmount).toFixed(2)}.`,
      }
    case actionType.SELL_STOCK:
      return {
        ...state,
        success: `You have successfully sold ${parseInt(action.payload.soldAmount)} shares of ${action.payload.stock_symbol} for $${(action.payload.price * parseInt(action.payload.soldAmount)).toFixed(2)}.`,
      }
    case actionType.ADD_WATCH_LIST_START:
      return {
        ...state,
        isAdding: true
      }
    case actionType.ADD_WATCH_LIST_SUCCESS:
      if (state.watchList.filter(stock => stock.symbol === action.payload).length > 0) {
        return {
          ...state,
          success: '',
          isAdding: false
        }
      } else {
        return {
          ...state,
          success: `${action.payload} added to watch list.`,
          watchList: [...state.watchList, action.payload],
          isAdding: false
        }
      }
    default:
      return state;
  }
}