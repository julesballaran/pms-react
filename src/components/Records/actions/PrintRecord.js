import React, { useState } from 'react'

import {
  Dialog,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core/';

import Close from '@material-ui/icons/Close'

export default function PrintRecord(props) {
	const { printModal, setPrintModal, data, print } = props
  const [sign, setSign] = useState('')
  const [type, setType] = useState('none')

	return (
		<Dialog open={printModal} onClose={()=>setPrintModal(false)}>
      <div style={{background: '#3f51b5', padding: 16}}>
        <Grid container>
          <h3 style={{color: 'white', margin: 0, padding: 0}}>Print Record</h3>
          <Close 
            style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
            onClick={()=>setPrintModal(false)}
          />
        </Grid>
      </div>
      <Grid container alignItems="base-line" style={{padding: 20}}>
        <TextField label="Sign" value={sign} onChange={e => setSign(e.target.value)}/>
        <Select
          value={type}
          onChange={e => setType(e.target.value)}
          style={{width: 180, margin: '0 10px'}}
        >
          <MenuItem value='none'>None</MenuItem>
          <MenuItem value='for reference'>for reference</MenuItem>
          <MenuItem value='for marriage'>for marriage</MenuItem>
        </Select>
        <Button variant="contained" color="primary" 
          onClick={()=>{
            print(data, sign, type)
            setPrintModal(false)
          }}
        >Confirm</Button>
      </Grid>
    </Dialog>
	)
}