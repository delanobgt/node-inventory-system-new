import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'

// set axios global authorization header
axios.interceptors.request.use(
  (config) => {
    config.headers['authorization'] = localStorage.getItem('token') || ''
    return config
  }, 
  (error) => {
    return Promise.reject(error)
  }
)

const store = createStore(
  reducers,
  {
    auth: { token: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
