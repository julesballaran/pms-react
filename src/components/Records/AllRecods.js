import React, { useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

import { makeStyles } from '@material-ui/styles'

import {
  Dialog,
  Button,
} from '@material-ui/core/';

import BaptismalDisplay from './display/BaptismalDisplay'
import ConfirmationDisplay from './display/ConfirmationDisplay'
import DeathDisplay from './display/DeathDisplay'
import MarriageDisplay from './display/MarriageDisplay'

import print from './print/print'

const useStyles = makeStyles({
  tFieldCont: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 20px',
  },
  tField: {
    flex: '1 1 100%',
    margin: 10,
  }
})

const styleCell = {
  padding: 0,
  width: 10,
}

export default function AllRecords(props){
  const classes = useStyles()
  const { baptismal, confirmation, death, marriage, fetchDataAll, setEdited } = props
  const [data, setData] = useState({})
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(true)
  const [delDialog, setDelDialog] = useState(false)
  const [state, setState] = useState({
    columns: [
      { title: 'Book', field: 'book', cellStyle: {styleCell}},
      { title: 'Page', field: 'page', cellStyle: {styleCell}},
      { title: 'Name', field: 'name', cellStyle: {styleCell}},
      { title: 'Father', field: 'father', cellStyle: {styleCell}},
      { title: 'Mother', field: 'mother', cellStyle: {styleCell}},
      { title: 'Date', field: 'date', cellStyle: {styleCell}},
      { title: 'Type', field: 'type', cellStyle: {styleCell}},
    ],
    data: [...baptismal, ...confirmation, ...death, ...marriage]
  })

  const handleEdit = () => {
    delete data.tableData
    axios
      .put(`http://localhost:9090/${data.type}/${data.id}`, data)
      .then(res => {
        const index = state.data.findIndex(d => d.id === data.id && d.type === data.type)
        const temp = state
        temp.data.splice(index, 1, res.data)
        setState(temp)
        setEdit(true)
        setModal(false)
        setEdited(true)
      })
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:9090/${data.type}/${data.id}`)
      .then(res => {
        const index = state.data.findIndex(d => d.id === data.id && d.type === data.type)
        const temp = state
        temp.data.splice(index, 1)
        setState(temp)
        setDelDialog(false)
        setModal(false)
        setEdited(true)
      })
  }

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
      {data.type === 'baptismal' ? 
        <BaptismalDisplay 
          modal={modal}
          setModal={setModal}
          classes={classes}
          data={data}
          setData={setData}
          edit={edit}
          setEdit={setEdit}
          handleEdit={handleEdit}
          setDelDialog={setDelDialog}
          print={print}
        />
      : data.type === 'confirmation' ?
        <ConfirmationDisplay 
          modal={modal}
          setModal={setModal}
          classes={classes}
          data={data}
          setData={setData}
          edit={edit}
          setEdit={setEdit}
          handleEdit={handleEdit}
          setDelDialog={setDelDialog}
          print={print}
        />
      : data.type === 'death' ? 
        <DeathDisplay 
          modal={modal}
          setModal={setModal}
          classes={classes}
          data={data}
          setData={setData}
          edit={edit}
          setEdit={setEdit}
          handleEdit={handleEdit}
          setDelDialog={setDelDialog}
          print={print}
        />
      : data.type === 'marriage' ?
        <MarriageDisplay 
          modal={modal}
          setModal={setModal}
          classes={classes}
          data={data}
          setData={setData}
          edit={edit}
          setEdit={setEdit}
          handleEdit={handleEdit}
          setDelDialog={setDelDialog}
          print={print}
        />    
      : null
      }
      <Dialog 
        open={delDialog}
        onClose={()=>setDelDialog(false)}
        className='del-dialog'
      >
        <h3>Remove {data.name}?</h3>
        <div className='del-dialog-btn'>
          <Button variant='contained' onClick={()=> setDelDialog(false)}>Cancel</Button>  
          <Button variant='contained' color='secondary' onClick={handleDelete}>Delete</Button> 
        </div>
      </Dialog>
    </React.Fragment>
  )
}