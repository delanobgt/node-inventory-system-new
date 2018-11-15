import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import * as productsActions from '../../actions/products'
import * as snackbarActions from '../../actions/snackbar'

class DeleteEmployeeDialog extends React.Component {

  handleDelete = () => {
    const { underDeleteProduct } = this.props
    this.props.deleteProduct(underDeleteProduct.id, error => {
      if (error) return this.props.errorSnackbar('Please try again')
      this.props.toggleDeleteProductDialog(null)
      this.props.successSnackbar('Deleted Product')
    })
  }
  handleClose = () => {
    this.props.toggleDeleteProductDialog(null)
  }

  render() {
    const { underDeleteProduct } = this.props
    if (!underDeleteProduct) return null
    return (
      <div>
        <Dialog
          open={Boolean(underDeleteProduct)}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Fragment>
            <DialogTitle id="form-dialog-title">Delete Product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Delete <span style={{ color: 'blue' }}>{underDeleteProduct.name}</span> permanently?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleDelete} color="primary">
                Delete
              </Button>
            </DialogActions>
          </Fragment>
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.products
  }
}

export default compose(
  connect(mapStateToProps, { ...productsActions, ...snackbarActions }),
)(DeleteEmployeeDialog)
