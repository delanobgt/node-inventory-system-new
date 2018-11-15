import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import nav from './nav'
import snackbar from './snackbar'
import products from './products'

export default combineReducers({
  auth,
  nav,
  snackbar,
  products,
  form: formReducer,
})
