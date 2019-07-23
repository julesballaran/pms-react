import React from 'react'

import {
  Dialog,
  TextField,
  Button,
} from '@material-ui/core/';

export default function BaptismalDisplay(props) {
  const { modal, setModal, classes, data, setData, edit, setEdit, handleEdit, setDelDialog, print } = props
  return (
    <Dialog
        open={modal}
        onClose={() => {
          setModal(false)
          setEdit(true)
        }}
      >
        <div className='display-details' style={{marginTop: 20}}>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Book' value={data.book} onChange={e => setData({...data, book: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Page' value={data.page} onChange={e => setData({...data, page: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='No' value={data.no} onChange={e => setData({...data, no: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Name' value={data.name} onChange={e => setData({...data, name: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit}label='Father' value={data.father} onChange={e => setData({...data, father: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Mother' value={data.mother} onChange={e => setData({...data, mother: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Birthdate' type='date' value={data.birthdate} onChange={e => setData({...data, birthdate: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Date of Baptismal' type='date' value={data.date} onChange={e => setData({...data, date: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Church' value={data.church} onChange={e => setData({...data, church: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Rev' value={data.rev} onChange={e => setData({...data, rev: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit}label='Sponsors' value={data.sponsors} onChange={e => setData({...data, sponsors: e.target.value.split(',')})}/>
          </div>
          {edit ? 
          <div className={classes.tFieldCont} style={{marginBottom: 20}}>
            <Button className={classes.tField} variant='contained' color='primary' onClick={print}>Print</Button>
            <Button className={classes.tField} variant='contained' style={{background: 'green', color: 'white'}} onClick={() => setEdit(false)}>Edit</Button>
            <Button className={classes.tField} variant='contained' color='secondary' onClick={() => setDelDialog(true)}>Delete</Button>
          </div>
          : 
          <div className={classes.tFieldCont} style={{marginBottom: 20}}>
            <Button className={classes.tField} variant='contained' onClick={() => setEdit(true)}>Cancel</Button>
            <Button className={classes.tField} variant='contained' style={{background: 'green', color: 'white'}} onClick={handleEdit}>Save</Button>
          </div>
          }
        </div>
      </Dialog>
  )
}