import _ from 'lodash'
import React from 'react'
import ReactExport from 'react-export-excel'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet


class ExportToExcel extends React.Component {
  render() {
    const { rows, headers, accessors, actionElement, filename } = this.props
    const dataset = [
      {
        columns: headers,
        data: _.map(rows, row => (
          _.map(accessors, accessors => accessors(row))
        ))
      }
    ]
    return (
      <ExcelFile 
        element={actionElement} 
        filename={filename || 'HRIS Excel'}>
        <ExcelSheet dataSet={dataset} name="Sheet1"/>
      </ExcelFile>
    )
  }
}

export default ExportToExcel
