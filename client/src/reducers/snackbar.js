import _ from 'lodash'
import { 
  SHOW_SNACKBAR,
  HIDE_SNACKBAR } from '../actions/conf'

const INITIAL_STATE = {
  toasters: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_SNACKBAR: {
      const { variant, message } = action.payload
      return { 
        toasters: {
          ..._.pickBy(state.toasters, value => value.open),
          [_.uniqueId()]: {
            open: true, 
            variant, 
            message     
          }
        }
      }
    }
    case HIDE_SNACKBAR: {
      return { 
        toasters: {
          ..._.pickBy(state.toasters, value => value.open),
          [action.payload]: {
            ...state.toasters[action.payload],
            open: false
          }
        }
      }
    }
    default:
      return state
  }
}
