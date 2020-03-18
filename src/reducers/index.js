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
  isFetching: false,
  isAdding: false
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.FETCH_USER:
      return {
        ...state,
        error: '',
      }
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
        error: '',
      }
    case actionType.FETCH_ALL_SUCCESS:
      const stockData = action.payload.stockList
      return {
        ...state,
        error: '',
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
        error: '',
        valueCurr: currPort.toFixed(2),
        dailyChange: (currPort - state.dailyInitial).toFixed(2),
        dailyPercentChange: ((currPort - state.dailyInitial) / 100).toFixed(2),
        isFetching: false,
      }
    case actionType.ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }
    case actionType.BUY_STOCK:
      if (action.payload.amount === '') { // check if input is empty then return error
        return {
          ...state,
          error: 'Amount required',
          success: '',
        }
      } else if (state.cash < (action.payload.amount * action.payload.price)) { // check if you have enough cash 
        return {
          ...state,
          success: '',
          error: `You do not have sufficient funds in your account. Current cash balance of $${state.cash}.`
        }
      } else if (state.portfolio.stocks.filter(stock => stock.symbol === action.payload.symbol).length === 1) { // check if you already own that stock 
        for (let i=0; i < state.portfolio.stocks.length; i++) { // find the array
          if (state.portfolio.stocks[i].symbol === action.payload.symbol) {
            state.portfolio.stocks[i].amount += action.payload.amount // add to the already existing amount
          }
        }
        return {
          ...state,
          portfolio: {
            stocks: [...state.portfolio.stocks] // update with the new amount
          },
          cash: (state.cash) - (action.payload.amount * action.payload.price),
          success: `You have successfully purchased ${action.payload.amount} shares of ${action.payload.symbol} for $${action.payload.price * action.payload.amount}.`,
        }
      } else { // add stock to portfolio list
        return {
          ...state,
          error: '',
          portfolio: {
            stocks: [...state.portfolio.stocks, action.payload]
          },
          cash: (state.cash) - (action.payload.amount * action.payload.price),
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

      if (parseFloat(action.payload.amount) > stock.amount) { // check if user put more than they own
        return {
          ...state,
          error: `Too many, you only have ${stock.amount} shares of ${stock.symbol} in your account.`,
          success: '',
        }
      } else if (parseFloat(action.payload.amount) === stock.amount) { // check if user is selling the max stock they own
        return {
          ...state,
          error: '',
          success: `You have successfully sold ${action.payload.amount} shares of ${action.payload.symbol} for $${action.payload.price * action.payload.amount}.`,
          portfolio: {
            stocks: state.portfolio.stocks.filter(val => val !== stock) // remove the stock from portfolio since we no longer own any
          },
          cash: (state.cash) + (action.payload.amount * action.payload.price),
        }
      } else {
        return {
          ...state,
          error: '',
          portfolio: {
            stocks: state.portfolio.stocks.map(val => val.symbol === action.payload.symbol 
              ? {...val, price: action.payload.price, amount: val.amount -= action.payload.amount}
              : val)
          },
          cash: (state.cash) + (action.payload.amount * action.payload.price),
          success: `You have successfully sold ${action.payload.amount} shares of ${action.payload.symbol} for $${action.payload.price * action.payload.amount}.`,
        }
      }
    case actionType.ADD_WATCH_LIST_START:
      return {
        ...state,
        isAdding: true
      }
    case actionType.ADD_WATCH_LIST_SUCCESS:
      if (state.watchList.filter(stock => stock.symbol === action.payload).length > 0) {
        console.log('EXISTS', action.payload)
        return {
          ...state,
          error: `You are already watching ${action.payload}.`,
          success: '',
          isAdding: false
        }
      } else {
        console.log('NOT EXISTS', action.payload)
        return {
          ...state,
          error: '',
          success: `${action.payload} added to watch list.`,
          watchList: [...state.watchList, action.payload],
          isAdding: false
        }
      }
    default:
      return state;
  }
}