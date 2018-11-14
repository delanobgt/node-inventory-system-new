import React, { Component, Fragment } from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import blue from '@material-ui/core/colors/blue'

import * as authActions from '../../actions/auth'
import * as snackbarActions from '../../actions/snackbar'
import CleanLink from '../misc/CleanLink'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3.5,
    marginBottom: theme.spacing.unit * 2
  },
  textField: {
    marginTop: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 1
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    padding: theme.spacing.unit * 3,
    width: '375px'
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

class SignUp extends Component {

  state = {
    submitStatus: IDLE,
  }

  renderField = (field) => {
    const { touched, error } = field.meta

    const errorMessage = (() => {
      if (touched && error) {
        if (error.push) {
          return (
            <ul>
              {error.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )
        } else {
          return <p>{error}</p>
        }
      }
      return null
    })()

    return (
      <div>
        <TextField
          {...field.input}
          type={field.type}
          label={`${field.label}`}
          fullWidth={true}
          className={field.className}
          autoComplete="off"
        />
        <div>
          {errorMessage}
        </div>
      </div>
    )
  }
  
  onSubmit = formProps => {
    this.setState({ submitStatus: SUBMITTING })
    this.props.signUp(formProps, error => {
      if (error) {
        this.setState({ submitStatus: IDLE })
        return this.props.errorSnackbar(`Please try again`)
      }
      this.props.history.push('/feature')
      this.props.successSnackbar("Registration complete")
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
              Create New Account
            </Typography>
            <form onSubmit={handleSubmit(this.onSubmit)} >
              <div>
                <Field
                  component={this.renderField}
                  name="email"
                  type="email"
                  label="Email"
                  className={classes.textField}
                />  
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  component={this.renderField}
                  className={classes.textField}
                />
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  component={this.renderField}
                  className={classes.textField}
                />
              </div>
              <div className={classes.authInfo}>
                {this.props.errorMessage}
              </div>
              <div className={classes.wrapper}>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="secondary" 
                  fullWidth={true}
                  className={classes.button}
                  disabled={submitStatus === SUBMITTING}
                >
                  Sign Up
                </Button>
                { submitStatus === SUBMITTING && <CircularProgress size={24} className={classes.buttonProgress} /> }
              </div>
            </form>
            <Typography component="p" align="center">
              Already have an account? &nbsp;
              <CleanLink to='/signin'>Sign In!</CleanLink>
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

  values.password = values.password || ''
  errors.password = [
    values.password.length < 8 ? `Password must be at least 8 (${values.password.length}/8)` : null,
    values.password.search(/[a-z]/g) === -1 ? 'Password must contain at least 1 lowercase character' : null,
    values.password.search(/[A-Z]/g) === -1 ? 'Password must contain at least 1 uppercase character' : null,
    values.password.search(/[0-9]/g) === -1 ? 'Password must contain at least 1 digit' : null,
  ].filter(error => error)
  if (!errors.password.length) delete errors['password']

  if (values.password !== values.confirmPassword) 
    errors.confirmPassword = 'Passwords don\'t match!'

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
  reduxForm({ validate, form: 'SignUp' })
)(SignUp)
