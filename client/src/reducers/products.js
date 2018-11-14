import _ from 'lodash'
import { 
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_DELETE_PRODUCT_DIALOG,
} from '../actions/conf'

const INITIAL_STATE = {
  employees: {},
  underDeleteEmployee: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { 
        ...state, 
        employees: _.mapKeys(action.payload, '_id')
      }
    }
    case CREATE_PRODUCT: {
      return { 
        ...state, 
        employees: _.pickBy(state.employees, employee => employee._id !== action.payload)
      }
    }
    case UPDATE_PRODUCT: {
      return { 
        ...state, 
        employees: _.pickBy(state.employees, employee => employee._id !== action.payload)
      }
    }
    case DELETE_PRODUCT: {
      return { 
        ...state, 
        employees: _.pickBy(state.employees, employee => employee._id !== action.payload)
      }
    }
    case TOGGLE_DELETE_PRODUCT_DIALOG: {
      return {
        ...state,
        underDeleteEmployee: action.payload
      }
    }
    default: {
      return state
    }
  }
}
