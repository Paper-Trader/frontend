import * as actionType from '../actions';

const initialState = {
  portfolio: {
    cash: 515,
    stocks: [
      {
        symbol: 'MU',
        price: 65.37,
        amount: 14
      },
      {
        symbol: 'AAPL',
        price: 300.28,
        amount: 17
      },
      {
        symbol: 'MSFT',
        price: 160.52,
        amount: 21
      },
    ]
  },
  dailyInitial: 10000,
  valueCurr: 0,
  isFetching: false,
  dailyChange: 0,
  dailyPercentChange: 0,
  success: '',
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
        stockList: action.payload.stockList,
        isFetching: false,
        portfolio: {
          cash: state.portfolio.cash,
          stocks: state.portfolio.stocks.map(val => {
            return {
              ...val,
              price: action.payload.stockList[action.payload.stockList.findIndex(x => x.symbol === val.symbol)].price
            }
          })
        }
      }
    case actionType.UPDATE_PORTFOLIO:
      return {
        ...state,
        error: '',
        valueCurr: Math.round((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => 
          acc + (val.price * val.amount), 0)) * 100) / 100,
        dailyChange: Math.round(((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => 
          acc + (val.price * val.amount), 0)) - state.dailyInitial) * 100) / 100,
        dailyPercentChange: Math.round((Math.round((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => 
          acc + (val.price * val.amount), 0)) * 100) / 100 / Math.round(((state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => 
          acc + (val.price * val.amount), 0)) - state.dailyInitial) * 100) / 100) * 100) / 100,
      }
    case actionType.ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }
    case actionType.BUY_STOCK:
      if (state.portfolio.cash < (action.payload.amount * action.payload.price)) {
        return {
          ...state,
          success: '',
          error: 'You do not have sufficient funds in your account.'
        }
      } else {
        return {
          ...state,
          error: '',
          portfolio: {
            cash: state.portfolio.cash,
            stocks: state.portfolio.stocks.map(val => val.symbol === action.payload.symbol 
              ? {...val, price: action.payload.price, amount: val.amount += action.payload.amount}
              : val)
          },
          success: `You have successfully purchased ${action.payload.amount} shares of ${action.payload.symbol} for ${action.payload.symbol * action.payload.amount}.`,
        }
      }  
    default:
      return state;
  }
}