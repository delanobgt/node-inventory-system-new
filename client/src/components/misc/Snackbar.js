import _ from 'lodash'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { withStyles } from '@material-ui/core/styles'

import * as snackbarActions from '../../actions/snackbar'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.primary.light,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

class MySnackbarContent extends React.Component {
  handleClickClose = (id) => {
    this.props.hideSnackbar(id)
  }

  render() {
    const { classes, className, message, variant, id } = this.props
    const Icon = variantIcon[variant]

    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => this.handleClickClose(id)}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    )
  }
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
}

const MySnackbarContentWrapper = compose(
  withStyles(styles1),
  connect(null, snackbarActions)
)(MySnackbarContent)

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

class CustomizedSnackbars extends React.Component {

  handleClose = (id) => (event, reason) => {
    if (reason === 'clickaway') return
    this.props.hideSnackbar(id)
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        {
          _.map(this.props.toasters, (toaster, key) =>
            <Snackbar
              key={key}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(toaster.open)}
              autoHideDuration={3000}
              onClose={this.handleClose(key)}
            >
              <MySnackbarContentWrapper
                id={key}
                variant={toaster.variant}
                className={classes.margin}
                message={toaster.message}
              />
            </Snackbar>
          )
        }
      </div>
    )
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    ...state.snackbar
  }
}

export default compose(
  withStyles(styles2),
  connect(mapStateToProps, snackbarActions)
)(CustomizedSnackbars)
