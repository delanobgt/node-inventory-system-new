import axios from 'axios'
import { 
  ROOT_URL,
	GET_EMPLOYEES,
	DELETE_EMPLOYEE,
	TOGGLE_DELETE_EMPLOYEE_DIALOG,
} from './conf'

export const getEmployees = (headers, callback) => async (dispatch) => {
  try {
		const response = await axios.get(`${ROOT_URL}/employees`, {
			params: { headers }
		})
    dispatch({
      type: GET_EMPLOYEES,
      payload: response.data
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}

export const deleteEmployee = (_id, callback) => async (dispatch) => {
  try {
    await axios.delete(`${ROOT_URL}/employees/${_id}`)
    dispatch({
      type: DELETE_EMPLOYEE,
      payload: _id
    })
    if (callback) callback()
  } catch (error) {
    if (callback) callback(error)
  }
}

export const toggleDeleteEmployeeDialog = (employee) => (dispatch) => {
	dispatch({
		type: TOGGLE_DELETE_EMPLOYEE_DIALOG,
		payload: employee
	})
}
