import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import {
  Dialog,
  Button,
} from '@material-ui/core/';

import DeathDisplay from './display/DeathDisplay'

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

export default function Death(props){
  const classes = useStyles()
  const { death, loaded } = props
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
      { title: 'Spouse', field: 'spouse', cellStyle: {styleCell}},
      { title: 'Date of Death', field: 'dateofdeath', cellStyle: {styleCell}},
      { title: 'Date of Burial', field: 'date', cellStyle: {styleCell}},
    ],
    data: death
  })

  useEffect(()=>{
    if(!loaded){
      props.history.push('/');
    } else {
      if(props.match.params.no){
        setState({...state, ...{data: death.filter(d => d.book === props.match.params.no)}})
      }
    }
  }, [])

  const handleEdit = () => {
    axios.put(`http://localhost:9090/${data.type}/${data.id}`, data)
    window.location.reload()
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:9090/${data.type}/${data.id}`)
    window.location.reload()
  }

  return (
    <React.Fragment>
      <MaterialTable
        title="Death"
        columns={state.columns}
        data={state.data}
        onRowClick={(e, rowData) => {
          setData(rowData)
          setModal(true)
        }}
      />
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
      />
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