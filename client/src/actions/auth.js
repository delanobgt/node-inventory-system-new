import axios from 'axios'
import { 
  ROOT_URL,
  AUTH_USER, 
  AUTH_ERROR } from './conf'

export const signUp = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/auth/signup`, formProps)
    const { token, error } = response.data
    if (error) throw error
    
    localStorage.setItem('token', token)
    dispatch({
      type: AUTH_USER,
      payload: token
    })
    if (callback) callback()
  } catch (error) {
    console.log(error)
    if (callback) callback(error)
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    })
  }
}

export const signIn = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${ROOT_URL}/auth/signin`, formProps)
    const { token } = response.data
    localStorage.setItem('token', token)
    dispatch({
      type: AUTH_USER,
      payload: token
    })
    if (callback) callback()
  } catch (error) {
    console.log(error)
    if (callback) callback(error)
    dispatch({ 
      type: AUTH_ERROR, 
      payload: 'Invalid login credentials' 
    })
  }
}

export const signOut = (callback) => {
  localStorage.removeItem('token')
  if (callback) callback()
  return {
    type: AUTH_USER,
    payload: ''
  }
}
