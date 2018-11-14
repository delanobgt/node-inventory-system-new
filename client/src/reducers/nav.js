import { TOGGLE_DRAWER } from '../actions/conf'

const INITIAL_STATE = {
  drawerOpen: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { 
        ...state, 
        drawerOpen: action.payload 
      }
    default:
      return state
  }
}
