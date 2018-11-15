import React, { Component, Fragment } from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'

import * as authActions from '../../actions/auth'
import * as snackbarActions from '../../actions/snackbar'
import CleanLink from '../misc/CleanLink'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3.5,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: 'blue'
  },
  textField: {
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 1
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    padding: theme.spacing.unit * 3,
    width: '350px'
  },
  authInfo: {
    textAlign: 'center',
    marginTop: '1em'
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -6,
    marginLeft: -12,
  },
})

const SUBMITTED = 'SUBMITTED', SUBMITTING = 'SUBMITTING', IDLE = 'IDLE'

class SignIn extends Component {

  state = {
    submitStatus: IDLE,
  }

  renderField = (field) => {
    const name = field.input.name
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return (
      <div>
        <TextField
          {...field.input}
          type={field.type}
          label={`${capitalizedName}`}
          fullWidth={true}
          className={field.className}
          autoComplete="off"
        />
        <div>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }
  
  onSubmit = formProps => {
    this.setState({ submitStatus: SUBMITTING })
    this.props.signIn(formProps, error => {
      if (error) {
        this.setState({ submitStatus: IDLE })
        return this.props.errorSnackbar(`Invalid email or password!`)
      }
      this.props.history.push('/')
      this.props.successSnackbar("You're logged in!")
      this.setState({ submitStatus: SUBMITTED })
    })
  }

  render() {
    const { submitStatus } = this.state
    const { classes, handleSubmit } = this.props
    return (
      <Fragment>
        <Grid container justify='center'>
          <Paper elevation={1} className={classes.paper}>
            <Typography variant="headline" component="h1" align="center">
              Hello!
            </Typography>
            <form onSubmit={handleSubmit(this.onSubmit)} >
              <div>
                <Field
                  component={this.renderField}
                  name="email"
                  type="email"
                  className={classes.textField}
                />  
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  component={this.renderField}
                  className={classes.textField}
                />
              </div>
              <div className={classes.wrapper}>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary" 
                  fullWidth={true}
                  className={classes.button}
                  disabled={submitStatus === SUBMITTING}
                >
                  Sign In
                </Button>
                { submitStatus === SUBMITTING && <CircularProgress size={24} className={classes.buttonProgress} /> }
              </div>
            </form>
            <Typography component="p" align="center">
              Don't have an account yet? &nbsp;
              <CleanLink to='/signup'>Sign Up!</CleanLink>
            </Typography>
          </Paper>
        </Grid>
      </Fragment>
    )
  }
}

function validate(values) {
  const emailTest = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

  const errors = {}

  if (!values.email)
    errors.email = 'Please specify an email!'
  else if (emailTest(values.email))
    errors.email = 'Invalid email address'

  if (!values.password) errors.password = 'Please specify a password!'
  return errors
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.errorMessage 
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { ...authActions, ...snackbarActions }),
  reduxForm({ validate, form: 'SignIn' })
)(SignIn)
