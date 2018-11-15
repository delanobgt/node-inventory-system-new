import axios from 'axios'
import { 
  ROOT_URL,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  TOGGLE_DELETE_PRODUCT_DIALOG,
  GET_INITIAL_BALANCES,
  UPDATE_INITIAL_BALANCE,
} from './conf'

export const getProducts = (callback) => async (dispatch) => {
  try {
		const response = await axios.get(`${ROOT_URL}/products`)
    dispatch({
      type: GET_PRODUCTS,
      payload: response.data
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}

export const createProduct = (product, callback) => async (dispatch) => {
  try {
		const response = await axios.post(`${ROOT_URL}/products`, product)
    dispatch({
      type: CREATE_PRODUCT,
      payload: response.data
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}

export const updateProduct = (id, newProduct, callback) => async (dispatch) => {
  try {
		const response = await axios.put(`${ROOT_URL}/products/${id}`, newProduct)
    dispatch({
      type: UPDATE_PRODUCT,
      payload: response.data
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}

export const deleteProduct = (id, callback) => async (dispatch) => {
  try {
    await axios.delete(`${ROOT_URL}/products/${id}`)
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}

export const toggleDeleteProductDialog = (product) => (dispatch) => {
	dispatch({
		type: TOGGLE_DELETE_PRODUCT_DIALOG,
		payload: product
	})
}

export const getInitialBalances = (callback) => async (dispatch) => {
  try {
    const response = await axios.get(`${ROOT_URL}/products/initial-balances`)
    dispatch({
      type: GET_INITIAL_BALANCES,
      payload: response.data
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}

export const updateInitialBalance = (id, initialBalance, callback) => async (dispatch) => {
  try {
		const response = await axios.put(`${ROOT_URL}/products/${id}/initial-balance`, initialBalance)
    dispatch({
      type: UPDATE_INITIAL_BALANCE,
      payload: response.data
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}
