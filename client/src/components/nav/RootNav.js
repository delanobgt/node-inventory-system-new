import React, { Component } from 'react'
import AppBar from './AppBar'
import Drawer from './Drawer'

import requireAuth from '../hoc/requireAuth'

class Nav extends Component {

  render() {
    return (
      <div>
        <AppBar/>
        <br/><br/>
        <Drawer/>
      </div>
    )
  }
}

export default requireAuth(Nav)
