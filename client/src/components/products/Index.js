import _ from 'lodash'
import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'

import DeleteProductDialog from './DeleteProductDialog'
import * as productsActions from '../../actions/products'
import * as snackbarActions from '../../actions/snackbar'

const LOADING = 'LOADING', ERROR = 'ERROR', DONE = 'DONE'

const styles = theme => ({
  retryText: {
    textAlign: 'center',
  },
  retryButton: {
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
  },
  headline: {
    marginBottom: '1em'
  },
  excelButton: {
    marginBottom: '1em'
  },
  textField: {
    width: '500px',
  }
})

class ProductsIndex extends React.Component {
  state = {
    status: LOADING,
    products: {},
    initialBalances: {},
    newProductName: '',
  }

  fetchData = async () => {
    this.setState({ status: LOADING })
    this.props.getProducts(error => {
      if (error) return this.setState({ status: ERROR })
      this.props.getInitialBalances(error => {
        if (error) return this.setState({ status: ERROR })
        const { products, initialBalances } = this.props
        this.setState({ products, initialBalances, status: DONE })
      })
    })
  }

  handleNameChange = (id, name) => {
    this.setState({
      products: {
        ...this.state.products,
        [id]: {
          ...this.state.products[id],
          name,
        }
      }
    })
  }

  handleQuantityChange = (id, quantity) => {
    quantity = quantity.trim().replace(/[^0-9]+/, '').replace(/^0+/, '')
    this.setState({
      initialBalances: {
        ...this.state.initialBalances,
        [id]: {
          ...this.state.initialBalances[id],
          quantity: ['0', ''].includes(quantity) ? undefined : quantity,
        }
      }
    })
  }

  handlePriceChange = (id, price) => {
    price = price.trim().replace(/[^,.0-9]+/, '')
    this.setState({
      initialBalances: {
        ...this.state.initialBalances,
        [id]: {
          ...this.state.initialBalances[id],
          price: [''].includes(price) ? undefined : price,
        }
      }
    })
  }

  shouldSaveChanges = (product) => {
    const { id } = product
    if (this.props.products[id].name !== this.state.products[id].name) return true
    if (String((this.props.initialBalances[id] || {}).quantity) !== String((this.state.initialBalances[id] || {}).quantity)) return true
    if (String((this.props.initialBalances[id] || {}).price) !== String((this.state.initialBalances[id] || {}).price)) return true
    return false
  }

  saveChanges = (product) => {
    const { id } = product
    if (this.state.initialBalances[id] && !(this.state.initialBalances[id].price || '').match(/^\d{1,3}(\.\d{3})*(,\d+)?$/)) {
      return this.props.errorSnackbar('Invalid Format!')
    }
    this.props.updateProduct(id, this.state.products[id], error => {
      if (error) return this.props.errorSnackbar('Failed to Update (1)')
      const { quantity, price } = this.state.initialBalances[id]
      this.props.updateInitialBalance(id, {
        quantity: quantity || 0,
        price: Number(String(price || '0').replace(/\./g, '').replace(/,/g, '.')),
      }, error => {
        if (error) return this.props.errorSnackbar('Failed to Update (2)')
        this.props.successSnackbar('Successfully updated!')
        this.setState({
          initialBalances: this.props.initialBalances,
          products: this.props.products,
        })
      })
    })
  }

  cancelChanges = (product) => {
    const { id } = product
    this.setState({
      initialBalances: {
        ...this.state.initialBalances,
        [id]: this.props.initialBalances[id],
      },
      products: {
        ...this.state.products,
        [id]: this.props.products[id],
      }
    })
  }

  handleNewProductNameChange = (e) => {
    const { value } = e.target
    this.setState({ newProductName: value })
  }

  createProduct = (e) => {
    e.preventDefault()
    const product = { name: this.state.newProductName }
    this.props.createProduct(product, (error) => {
      if (error) return this.props.errorSnackbar('Failed to Add New Product!')
      this.props.successSnackbar('New Product added')
      this.setState({
        newProductName: '',
        products: this.props.products,
      })
    })
  }

  async componentDidMount() {
    await this.fetchData()
  }

  render() {
    const { classes, products, toggleDeleteProductDialog } = this.props
    const { status } = this.state
    // filter method
    const containFilter = (filter, row) => {
      return row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
    }
    // [Header, accessor] for react-table
    const columns = [
      ['No', d => String(d.order_no)],
      ['Product Name', d => d.name, (props) => {
        const { id } = props.original
        return (
          <TextField
            type="text" 
            value={this.state.products[id].name}
            onChange={(e) => this.handleNameChange(id, e.target.value)}
            style={{ display: 'block', width: '100%' }}
            label={this.props.products[id].name !== this.state.products[id].name ? '(Modified)' : ''}
          >
          </TextField>
        )
      }],
      ['Initial Quantity', d => String((this.state.initialBalances[d.id] || {}).quantity), (props) => {
        const { id } = props.original
        const initialBalances = this.state.initialBalances[id] || {}
        return (
          <TextField
            type="text" 
            value={initialBalances.quantity || 0}
            onChange={(e) => this.handleQuantityChange(id, e.target.value)}
            style={{ display: 'block', width: '100%', textAlign: 'right' }}
            label={String((this.props.initialBalances[id] || {}).quantity) !== String((this.state.initialBalances[id] || {}).quantity) ? '(Modified)' : ''}
          >
          </TextField>
        )
      }],
      ['Initial Price', d => String((this.state.initialBalances[d.id] || {}).price), (props) => {
        const { id } = props.original
        const initialBalances = this.state.initialBalances[id] || {}
        return (
          <TextField
            type="text" 
            value={initialBalances.price || ''}
            onChange={(e) => this.handlePriceChange(id, e.target.value)}
            style={{ display: 'block', width: '100%', textAlign: 'right' }}
            label={this.state.initialBalances[id] && !String(this.state.initialBalances[id].price || '').match(/^\d{1,3}(\.\d{3})*(,\d+)?$/) ? '(Invalid Format)' : 
              String((this.props.initialBalances[id] || {}).price) !== String((this.state.initialBalances[id] || {}).price) ? '(Modified)' : ''}
          >
          </TextField>
        )
      }],
      ['Save Changes', d => '', (props) => (
        this.shouldSaveChanges(props.original) ? (
          <div style={{ textAlign: 'center' }}> 
            <Button 
              variant="outlined" color="primary" className={classes.button}
              onClick={() => this.saveChanges(props.original)} 
              style={{ margin: '0.5em' }}
            >
              Save
            </Button>
            <Button 
              variant="outlined" color="secondary" className={classes.button}
              onClick={() => this.cancelChanges(props.original)} 
              style={{ margin: '0.5em' }}
            >
              Cancel
            </Button>
          </div>
        ) : null
      )],
      ['Delete Product', d => '', (props) => (
        <div style={{ textAlign: 'center' }}> 
          <DeleteIcon 
            style={{ cursor: 'pointer' }} 
            onClick={() => toggleDeleteProductDialog(props.original)} 
          />
        </div>
      )],
    ]
    const formattedData = _.chain(products)
      .sortBy(product => product.name)
      .values()
      .map((row, idx) => ({ ...row, order_no: idx+1 }))
      .value()

    const table = status === DONE && formattedData.length ? (
      <div>
        <ReactTable
          data={formattedData}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          defaultPageSize={10}
          className="-striped -highlight"
          columns={[..._.map(columns, column => (
            _.pickBy({
              Header: column[0],
              id: column[0],
              accessor: column[1],
              Cell: column[2],
              filterMethod: containFilter,
            }, prop => prop)
          ))]}
        />
      </div>
    ) : null

    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={11}>
            <Typography variant="headline" className={classes.headline}>Product List</Typography>
            { 
              status === LOADING ? (
                // loading progress circle
                <CircularProgress size={50} style={{marginLeft: '50%'}} />
              ) : status === ERROR ? ( 
                // error message
                <Fragment>
                  <Typography variant="subheading" className={classes.retryText}>
                    Cannot fetch data
                  </Typography>
                  <Button 
                    color="primary" 
                    className={classes.retryButton}
                    onClick={this.fetchData}
                  >
                    Retry
                  </Button>
                </Fragment>
              ) : status === DONE ? (
                <Fragment>
                  <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={this.createProduct}>
                    <TextField
                      label="New Product Name"
                      className={classes.textField}
                      value={this.state.newProductName}
                      onChange={this.handleNewProductNameChange}
                      margin="normal"
                      required={true}
                    />
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                      Add
                    </Button>
                  </form>
                  { table }
                </Fragment>
              ) : null
            }
            <DeleteProductDialog/>
          </Grid>
        </Grid>
        <br/><br/>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.products
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { ...productsActions, ...snackbarActions }),
)(ProductsIndex)
