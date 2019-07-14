import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

const styleCell = {
  padding: 0,
  width: 10,
}

export default function Baptismal(props){
  const { baptismal, confirmation } = props
  const [state] = useState({
    columns: [
      { title: 'Book', field: 'book', cellStyle: {styleCell}},
      { title: 'Page', field: 'page', cellStyle: {styleCell}},
      { title: 'No', field: 'no', cellStyle: {styleCell}},
      { title: 'Name', field: 'name', cellStyle: {styleCell}},
      { title: 'Father', field: 'father', cellStyle: {styleCell}},
      { title: 'Mother', field: 'mother', cellStyle: {styleCell}},
      { title: 'Birth Date', field: 'birthdate', cellStyle: {styleCell}},
      { title: 'Date', field: 'date', cellStyle: {styleCell}},
      { title: 'Type', field: 'type', cellStyle: {styleCell}},
    ],
    data: [...baptismal, ...confirmation]
  })


  return (
    <MaterialTable
      title="All Records"
      columns={state.columns}
      data={state.data}
      onRowClick={(e, rowData)=> console.log(rowData)}
    />
  )
}