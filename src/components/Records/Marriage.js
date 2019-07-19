import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

const styleCell = {
  padding: 0,
  width: 10,
}

export default function Marriage(props){
  const { marriage, loaded } = props
  const [state, setState] = useState({
    columns: [
      { title: 'Book', field: 'book', cellStyle: {styleCell}},
      { title: 'Page', field: 'page', cellStyle: {styleCell}},
      { title: 'No', field: 'no', cellStyle: {styleCell}},
      { title: 'Name', field: 'name', cellStyle: {styleCell}},
      { title: 'Father', field: 'father', cellStyle: {styleCell}},
      { title: 'Mother', field: 'mother', cellStyle: {styleCell}},
      { title: 'Birth Date', field: 'birthdate', cellStyle: {styleCell}},
      { title: 'Date', field: 'date', cellStyle: {styleCell}},
    ],
    data: marriage
  })

  useEffect(()=>{
    if(!loaded){
      props.history.push('/');
    } else {
      if(props.match.params.no){
        setState({...state, ...{data: marriage.filter(m => m.book === props.match.params.no)}})
      }
    }
  }, [])

  return (
    <MaterialTable
      title="Marriage"
      columns={state.columns}
      data={state.data}
      onRowClick={(e, rowData)=> console.log(rowData)}
    />
  )
}