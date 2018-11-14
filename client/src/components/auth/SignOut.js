import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../../actions/auth'
import * as snackbarActions from '../../actions/snackbar'

class SignOut extends Component {
  componentDidMount() {
    this.props.signOut(() => {
      this.props.infoSnackbar("You're logged out")
    })
  }

  render() {
    return (
      <div>
        Logging you out..
      </div>
    )
  }
}

export default compose(
  connect(null, { ...authActions, ...snackbarActions })
)(SignOut)
