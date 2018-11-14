import { TOGGLE_DRAWER } from './conf'

export const toggleDrawerOpen = (open) => {
  return({ 
    type: TOGGLE_DRAWER, 
    payload: open
  })
}
