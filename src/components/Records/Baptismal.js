import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'

import { makeStyles } from '@material-ui/styles'

import {
  Dialog,
  Button,
} from '@material-ui/core/';

import BaptismalDisplay from './display/BaptismalDisplay'

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

export default function Baptismal(props){
  const classes = useStyles()
  const { baptismal, loaded } = props
  const [data, setData] = useState({})
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(true)
  const [delDialog, setDelDialog] = useState(false)
  const [state, setState] = useState({
    columns: [
      { title: 'Book', field: 'book', cellStyle: {styleCell}},
      { title: 'Page', field: 'page', cellStyle: {styleCell}},
      { title: 'No', field: 'no', cellStyle: {styleCell}},
      { title: 'Name', field: 'name', cellStyle: {styleCell}},
      { title: 'Father', field: 'father', cellStyle: {styleCell}},
      { title: 'Mother', field: 'mother', cellStyle: {styleCell}},
      { title: 'Birth Date', field: 'birthdate', cellStyle: {styleCell}},
      { title: 'Baptismal Date', field: 'date', cellStyle: {styleCell}},
    ],
    data: baptismal
  })

  useEffect(()=>{
    if(!loaded){
      props.history.push('/');
    } else {
      if(props.match.params.no){
        setState({...state, ...{data: baptismal.filter(c => c.book === props.match.params.no)}})
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
        title="Baptismal"
        columns={state.columns}
        data={state.data}
        onRowClick={(e, rowData) => {
          setData(rowData)
          setModal(true)
        }}
      />
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