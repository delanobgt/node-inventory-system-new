import { 
  SHOW_SNACKBAR,
  HIDE_SNACKBAR } from './conf'

export const hideSnackbar = (id) => {
  return({ 
    type: HIDE_SNACKBAR,
    payload: id
  })
}

export const successSnackbar = (message) => {
  return({ 
    type: SHOW_SNACKBAR,
    payload: {
      variant: 'success',
      message
    }
  })
}

export const errorSnackbar = (message) => {
  return({ 
    type: SHOW_SNACKBAR,
    payload: {
      variant: 'error',
      message
    }
  })
}

export const warningSnackbar = (message) => {
  return({ 
    type: SHOW_SNACKBAR,
    payload: {
      variant: 'warning',
      message
    }
  })
}

export const infoSnackbar = (message) => {
  return({ 
    type: SHOW_SNACKBAR,
    payload: {
      variant: 'info',
      message
    }
  })
}