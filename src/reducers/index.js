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
  watchList: [
    {
      symbol: 'TWTR',
      price: 31.64
    },
    {
      symbol: 'ATVI',
      price: 59.74
    },
    {
      symbol: 'AMD',
      price: 48.39
    },
  ],
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
      let currPort = (state.portfolio.cash + state.portfolio.stocks.reduce((acc, val) => acc + (val.price * val.amount), 0))
      return {
        ...state,
        error: '',
        valueCurr: Math.round(currPort * 100) / 100,
        dailyChange: Math.round((currPort - state.dailyInitial) * 100) / 100,
        dailyPercentChange: Math.round(((currPort - state.dailyInitial) * 100) / 100) / 100
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
          error: `You do not have sufficient funds in your account. Current cash balance of $${state.portfolio.cash}.`
        }
      } else {
        return {
          ...state,
          error: '',
          portfolio: {
            cash: (state.portfolio.cash) - (action.payload.amount * action.payload.price),
            stocks: state.portfolio.stocks.map(val => val.symbol === action.payload.symbol 
              ? {...val, price: action.payload.price, amount: val.amount += parseInt(action.payload.amount)}
              : val)
          },
          success: `You have successfully purchased ${action.payload.amount} shares of ${action.payload.symbol} for $${action.payload.price * action.payload.amount}.`,
        }
      }  
    case actionType.SELL_STOCK:
      if (action.payload.amount === '') { // check if input is empty then return error
        return {
          ...state,
          error: 'Amount required',
          success: '',
        }
      } 

      let stock;
      for (let i=0; i < state.portfolio.stocks.length; i++) { // find the array
        if (state.portfolio.stocks[i].symbol === action.payload.symbol) {
          stock = state.portfolio.stocks[i] // set stock var to the proper stock in portfolio
        }
      }

      if (action.payload.amount > stock.amount) { // check if user put more than they own
        return {
          ...state,
          error: `Too many, you only have ${stock.amount} shares of ${stock.symbol} in your account.`,
          success: '',
        }
      } else {
        return {
          ...state,
          error: '',
          portfolio: {
            cash: (state.portfolio.cash) + (action.payload.amount * action.payload.price),
            stocks: state.portfolio.stocks.map(val => val.symbol === action.payload.symbol 
              ? {...val, price: action.payload.price, amount: val.amount -= action.payload.amount}
              : val)
          },
          success: `You have successfully sold ${action.payload.amount} shares of ${action.payload.symbol} for $${action.payload.price * action.payload.amount}.`,
        }
      }

    default:
      return state;
  }
}