import * as actionType from '../actions';

const initialState = {
  portfolio: {
    stocks: []
  },
  stockList: [],
  watchList: [],
  cash: 0,
  dailyInitial: 10000,
  success: '',
  serverError: '',
  error: '',
  isFetching: false,
  isAdding: false,
  currPage: 1,
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
        isFetching: false
      }
    case actionType.ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      }
    case actionType.ERROR:
      console.log(action.payload)
      return {
        ...state,
        serverError: action.payload,
      }
    case actionType.SUCCESS:
      return {
        ...state,
        success: action.payload,
      }
    case actionType.CHANGE_PAGE:
      return {
        ...state,
        currPage: action.payload,
      }
    default:
      return state;
  }
}