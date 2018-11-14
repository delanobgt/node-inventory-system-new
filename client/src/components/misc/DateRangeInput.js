import moment from 'moment'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import * as snackbarActions from '../../actions/snackbar'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3.5,
    marginBottom: theme.spacing.unit * 2,
  },
  dateField: {
    margin: '0.5em 0.5em',
    display: 'inline-block',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  wrapper: {
    padding: '1em',
  }
})

class DateRangeInput extends Component {

  state = {
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  }

  handleChange = stateName => event => {
    this.setState({ [stateName]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { startDate, endDate } = this.state
    if (moment(startDate).isAfter(endDate)) {
      this.props.errorSnackbar('Invalid data range!')
      return
    }
    if (!this.props.onAction) 
      return this.props.errorSnackbar('onAction not provided!')
    this.props.onAction(startDate, endDate)
  }

  render() {
    const { classes, actionButtonDisabled } = this.props

    return (
      <div className={classes.wrapper}>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={32} className={classes.container}>
            <TextField
              type="date"
              label="Start Date"
              required={true}
              onChange={this.handleChange('startDate')}
              value={this.state.startDate}
              className={classes.dateField}
              autoComplete="off"
            />
            <TextField
              type="date"
              label="End Date"
              required={true}
              onChange={this.handleChange('endDate')}
              value={this.state.endDate}
              className={classes.dateField}
              autoComplete="off"
            />
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={actionButtonDisabled !== undefined && Boolean(actionButtonDisabled)}
              >
                Generate
              </Button>
            </div>
          </Grid>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { ...snackbarActions }),
)(DateRangeInput)
