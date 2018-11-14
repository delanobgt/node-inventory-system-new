import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Snackbar from './misc/Snackbar'
import RootNav from './nav/RootNav'
import Welcome from './dashboard/Welcome'

import SignUp from './auth/SignUp'
import SignOut from './auth/SignOut'
import SignIn from './auth/SignIn'

import EmployeeList from './employees/employee-list/Index'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Snackbar />
          <Switch>
            {!this.props.token ? (
              <Fragment>
                <Switch>
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="*" component={ () => <Redirect to="/signin"/> }/>
                </Switch>
              </Fragment>
            ) : (
              <Fragment>
                <RootNav />
                <Switch>
                  <Route path="/" exact component={Welcome} />
                  <Route path="/signout" component={SignOut} />

                  <Route path="/employees" exact component={EmployeeList} />

                  <Route path="*" component={ () => <Redirect to="/"/> }/>
                </Switch>
              </Fragment>
            )}
          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.auth
  }
}

export default connect(mapStateToProps)(App)
