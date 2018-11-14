import { 
  AUTH_USER, 
  AUTH_ERROR } from '../actions/conf'

const INITIAL_STATE = {
  token: '',
  errorMessage: '',
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER: {
      return { 
        ...state,
        token: action.payload,
        errorMessage: '',
      }
    }
    case AUTH_ERROR: {
      return { 
        ...state, 
        token: '',
        errorMessage: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
