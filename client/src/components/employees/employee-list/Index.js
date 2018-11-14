import _ from 'lodash'
import moment from 'moment'
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
import { withStyles } from '@material-ui/core/styles'

import ExportToExcel from '../../misc/ExportToExcel'
import DeleteEmployeeDialog from './DeleteEmployeeDialog'
import * as employeesActions from '../../../actions/employees'

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
  }
})

class EmployeeListIndex extends React.Component {
  state = {
    status: LOADING,
  }

  fetchData = async () => {
    // requested columns in AJAX request
    const headers = [
      'nik',
      'nama_depan',
      'nama_tengah',
      'nama_belakang',
      'tanggal_lahir',
      'kategori_pegawai',
      'department',
      'jam_masuk',
      'atasan_langsung',
    ]
    this.setState({ status: LOADING })
    this.props.getEmployees(headers, error => {
      if (error) {
        return this.setState({ status: ERROR })
      }
      this.setState({ status: DONE })
    })
  }

  async componentDidMount() {
    await this.fetchData()
  }

  render() {
    const { classes, employees, toggleDeleteEmployeeDialog } = this.props
    const { status } = this.state
    // filter method
    const containFilter = (filter, row) => {
      return row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
    }
    // [Header, accessor] for react-table
    const columns = [
      ['No', d => d.order_no],
      ['NIK', d => d.nik],
      ['Nama', d => _.compact([d.nama_depan, d.nama_tengah, d.nama_belakang]).join(' ')],
      ['Tanggal Lahir', d=> d.tanggal_lahir? moment(d.tanggal_lahir).format('DD-MM-YYYY'):'-'],
      ['Kategori Pegawai', d => d.kategori_pegawai || '-'],
      ['Departemen', d => d.department || '-'],
      ['Jam Masuk', d => d.jam_masuk || '-'],
      ['Atasan Langsung', d => d.atasan_langsung || '-'],
    ]
    const formattedData = _.map(_.values(employees), (row, idx) => ({ ...row, order_no: idx+1 }))
    const exportToExcel = status === DONE && formattedData.length ? (
      <ExportToExcel 
        rows={formattedData}
        headers={columns.map(col => col[0])}
        accessors={columns.map(col => col[1])}
        filename="[HRIS] Employee List"
        actionElement={<Button variant="outlined" color="primary" className={classes.excelButton}>Excel</Button>}
      />
    ) : null
    const table = status === DONE &&formattedData.length ? (
      <div>
        <ReactTable
          data={formattedData}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          defaultPageSize={10}
          className="-striped -highlight"
          columns={[..._.map(columns, column => (
            {
              Header: column[0],
              id: column[0],
              accessor: column[1],
              filterMethod: containFilter
            }
          )), 
          {
            Header: 'Delete',
            accessor: '_id',
            Cell: (props) => (
              <div style={{ textAlign: 'center' }}> 
                <DeleteIcon 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => toggleDeleteEmployeeDialog(props.original)} 
                />
              </div>
            )
          }
        ]}
        />
      </div>
    ) : null

    return (
      <Fragment>
        <Grid container justify='center'>
          <Grid item xs={11}>
            <Typography variant="headline" className={classes.headline}>Employee List</Typography>
            {exportToExcel}
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
              ) : null
            }
            { table }
            <DeleteEmployeeDialog/>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.employees
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { ...employeesActions }),
)(EmployeeListIndex)
