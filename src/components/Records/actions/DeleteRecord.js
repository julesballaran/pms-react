import React from 'react'
import {
  Dialog,
  Button,
  Grid
} from '@material-ui/core/';

import Close from '@material-ui/icons/Close'

export default function DeleteRecord(props) {
	const { delDialog, setDelDialog, handleDelete, data} = props
	return (
		<React.Fragment>
			<Dialog 
        open={delDialog}
        onClose={()=>setDelDialog(false)}
        className='del-dialog'
      > 
        <div style={{background: '#3f51b5', padding: 16}}>
          <Grid container>
            <h3 style={{color: 'white', margin: 0, padding: 0}}>Remove Record</h3>
            <Close 
              style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
              onClick={()=>setDelDialog(false)}
            />
          </Grid>
        </div>
        <h3>Remove {data.name}?</h3>
        <div className='del-dialog-btn'>
          <Button style={{color: 'black', border: '1px solid black'}} onClick={()=> setDelDialog(false)}>Cancel</Button>  
          <Button style={{color: 'red', border: '1px solid black'}} onClick={handleDelete}>Delete</Button> 
        </div>
      </Dialog>
		</React.Fragment>
	)
}