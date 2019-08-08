import React, { useState } from 'react'

import {
  Dialog,
  TextField,
  Button,
  Grid,
} from '@material-ui/core/';

import Close from '@material-ui/icons/Close'
import PrintRecord from '../actions/PrintRecord'

export default function MarriageDisplay(props) {
  const { modal, setModal, classes, data, setData, edit, setEdit, handleEdit, setDelDialog, print } = props
  const [printModal, setPrintModal] = useState(false)

  return (
    <React.Fragment>
      <Dialog
        open={modal}
        onClose={() => {
          setModal(false)
          setEdit(true)
        }}
      >
        <div className='display-details'>
          <div style={{background: '#3f51b5', padding: 16}}>
            <Grid container>
              <h3 style={{color: 'white', margin: 0}}>Marriage Record</h3>
              <Close 
                style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
                onClick={() => {
                  setModal(false)
                  setEdit(true)
                }}
              />
            </Grid>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Book' value={data.book} onChange={e => setData({...data, book: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Page' value={data.page} onChange={e => setData({...data, page: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Name #1' value={data.name} onChange={e => setData({...data, name: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Age #1' value={data.age} onChange={e => setData({...data, age: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Name #2' value={data.name2} onChange={e => setData({...data, name2: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Age #2' value={data.age2} onChange={e => setData({...data, age2: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Civil Status #1' value={data.civilstatus} onChange={e => setData({...data, civilstatus: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Nationality #1' value={data.nationality} onChange={e => setData({...data, nationality: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Residence #1' value={data.residence} onChange={e => setData({...data, residence: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Civil Status #2' value={data.civilstatus2} onChange={e => setData({...data, civilstatus2: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Nationality #2' value={data.nationality2} onChange={e => setData({...data, nationality2: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Residence #2' value={data.residence2} onChange={e => setData({...data, residence2: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Father #1' value={data.father} onChange={e => setData({...data, father: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Mother #1' value={data.mother} onChange={e => setData({...data, mother: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Father #2' value={data.father2} onChange={e => setData({...data, father2: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Mother #2' value={data.mother2} onChange={e => setData({...data, mother2: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Witness #1' value={data.witness} onChange={e => setData({...data, witness: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Witness #2' value={data.witness2} onChange={e => setData({...data, witness2: e.target.value})}/>
          </div>
          <div className={classes.tFieldCont}>
            <TextField className={classes.tField} disabled={edit} label='Date of Marriage' type='date' value={data.date} onChange={e => setData({...data, date: e.target.value})}/>
            <TextField className={classes.tField} disabled={edit} label='Place of Marriage' value={data.placeofmarriage} onChange={e => setData({...data, placeofmarriage: e.target.value})}/>          
            <TextField className={classes.tField} disabled={edit} label='Rev' value={data.rev} onChange={e => setData({...data, rev: e.target.value})}/>
          </div>
          {edit ? 
          <div className={classes.tFieldCont} style={{marginBottom: 20}}>
            <Button className={classes.tField} style={{color: '#3f51b5', border: '1px solid #3f51b5'}} onClick={()=>setPrintModal(true)}>Print</Button>
            <Button className={classes.tField} style={{color: 'green', border: '1px solid green'}} onClick={() => setEdit(false)}>Edit</Button>
            <Button className={classes.tField} style={{color: 'red', border: '1px solid red'}} onClick={() => setDelDialog(true)}>Delete</Button>
          </div>
          : 
          <div className={classes.tFieldCont} style={{marginBottom: 20}}>
            <Button className={classes.tField} style={{color: 'black', border: '1px solid black'}} onClick={() => setEdit(true)}>Cancel</Button>
            <Button className={classes.tField} style={{color: 'green', border: '1px solid green'}} onClick={handleEdit}>Save</Button>
          </div>
          }
        </div>
      </Dialog>
      <PrintRecord 
        printModal={printModal}
        setPrintModal={setPrintModal}
        data={data}
        print={print}
      />
    </React.Fragment>
  )
}