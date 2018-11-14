import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as authActions from '../../actions/auth'
import * as snackbarActions from '../../actions/snackbar'

export default ChildComponent => {
  class ComposedComponent extends Component {

    state = {
      showChildren: false,
    }

    componentDidMount() {
      if (this.props.token) {
        this.props.getSelfProfile(error => {
          if (error) {
            if (this.props.history) this.props.history.goBack()  
            this.props.errorSnackbar(`Can't read Profile!`)
            return 
          }
          this.shouldNavigateAway()
        })
      }
    }

    shouldNavigateAway = () => {
      if (!this.props.token) {
        this.props.history.push('/signin')
      } else {
        this.setState({ showChildren: true })
      }
    }

    render() {
      if (this.state.showChildren) return <ChildComponent {...this.props} />
      else return null
    }
  }

  function mapStateToProps(state) {
    return { 
      ...state.auth
    }
  }

  return connect(mapStateToProps, { ...authActions, ...snackbarActions })(ComposedComponent)
}
