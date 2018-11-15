import _ from 'lodash'
import { 
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_DELETE_PRODUCT_DIALOG,
  GET_INITIAL_BALANCES,
  UPDATE_INITIAL_BALANCE,
} from '../actions/conf'

const INITIAL_STATE = {
  products: {},
  initialBalances: {},
  underDeleteProduct: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { 
        ...state, 
        products: _.mapKeys(action.payload, 'id'),
      }
    }
    case CREATE_PRODUCT:
    case UPDATE_PRODUCT: {
      return { 
        ...state, 
        products: {
          ...state.products,
          [action.payload.id]: action.payload,
        }
      }
    }
    case DELETE_PRODUCT: {
      return { 
        ...state, 
        products: _.pickBy(state.products, product => product.id !== action.payload)
      }
    }
    case TOGGLE_DELETE_PRODUCT_DIALOG: {
      return {
        ...state,
        underDeleteProduct: action.payload
      }
    }
    case GET_INITIAL_BALANCES: {
      return { 
        ...state, 
        initialBalances: _.chain(action.payload)
          .mapKeys('productID')
          .mapValues(initialBalance => ({
            ...initialBalance,
            price: String(initialBalance.price).replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.'),
          }))
          .value()
      }
    }
    case UPDATE_INITIAL_BALANCE: {
      return { 
        ...state, 
        initialBalances: {
          ...state.initialBalances,
          [action.payload.productID]: {
            ...action.payload,
            quantity: action.payload.quantity,
            price: String(action.payload.price).replace(/,/g, '#').replace(/\./g, ',').replace(/#/g, '.'),
          }
        }
      }
    }
    default: {
      return state
    }
  }
}
