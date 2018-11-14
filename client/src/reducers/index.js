import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import nav from './nav'
import snackbar from './snackbar'
import employees from './employees'

export default combineReducers({
  auth,
  nav,
  snackbar,
  employees,
  form: formReducer,
})
