import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';

import AddBox from '@material-ui/icons/AddBox';

import {
  Dialog,
  TextField,
} from '@material-ui/core/';

const styleCell = {
  padding: 0,
  width: 10,
}

export default function AllRecords(props){
  const { baptismal, confirmation, death, marriage } = props
  const [data, setData] = useState({})
  const [modal, setModal] = useState(false)
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
    data: [...baptismal, ...confirmation, ...death, ...marriage]
  })

  return (
    <React.Fragment>
      <MaterialTable
        title="All Records"
        columns={state.columns}
        data={state.data}
        onRowClick={(e, rowData) => {
          setData(rowData)
          setModal(true)
        }}
      />
      <Dialog
        open={modal}
        onClose={()=>setModal(false)}
      >
        <div className='display-details'> 
          <TextField label='Name' value={data.name} onChange={e => setData({...data, name: e.target.value})}/>
          <TextField label='Father' value={data.father} onChange={e => setData({...data, father: e.target.value})}/>
          <TextField label='Mother' value={data.mother} onChange={e => setData({...data, mother: e.target.value})}/>
          <TextField label='Birthdate' type='date' value={data.birthdate} onChange={e => setData({...data, birthdate: e.target.value})}/>
          <TextField label='Church' value={data.church} onChange={e => setData({...data, church: e.target.value})}/>
          <TextField label='Date' type='date' value={data.date} onChange={e => setData({...data, date: e.target.value})}/>
          <TextField label='Rev' value={data.rev} onChange={e => setData({...data, rev: e.target.value})}/>
          <TextField label='Sponsors' value={data.sponsors} onChange={e => setData({...data, sponsors: e.target.value.split(',')})}/>
        </div>
      </Dialog>
    </React.Fragment>
  )
}