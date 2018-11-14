import _ from 'lodash'
import { 
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
  TOGGLE_DELETE_EMPLOYEE_DIALOG,
} from '../actions/conf'

const INITIAL_STATE = {
  employees: {},
  underDeleteEmployee: null,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_EMPLOYEES: {
      return { 
        ...state, 
        employees: _.mapKeys(action.payload, '_id')
      }
    }
    case DELETE_EMPLOYEE: {
      return { 
        ...state, 
        employees: _.pickBy(state.employees, employee => employee._id !== action.payload)
      }
    }
    case TOGGLE_DELETE_EMPLOYEE_DIALOG: {
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
