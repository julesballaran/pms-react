import React, {useState} from 'react'
import {
  Paper,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Grid,
}
  from '@material-ui/core/';
import Book from '@material-ui/icons/Book';

const modalStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'white',
  outline: 'none',
  height: 300,
  width: 350,
}

const btnStyle = {
  width: 150,
  height: 35,
  display: 'flex',
  margin: '15px 10px 0 auto',
  fontSize: 15,
  fontWeight: 'bolder',
  border: '1px solid black',
}


export default function Books(){

  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [bookName, setBookName] = useState('')
  const [bookNo, setBookNo] = useState('')
  
  return (
    <React.Fragment>
      <Button 
        style={btnStyle} 
        onClick={() => setOpen(true)}
      >Add Book
      </Button>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
      <Paper className='book-style'>
        <Book style={{fontSize: 120,}}/>
        <h3>Book 1</h3>
        <p>200 entries</p>
      </Paper>
      <Paper className='book-style'></Paper>
      <Paper className='book-style'></Paper>
      <Paper className='book-style'></Paper>
      <Paper className='book-style'></Paper>
      </Grid>

      <Modal 
        open={open}
        onClose={() => setOpen(false)}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      > 
        <div style={modalStyle}>
          <TextField
            style={{width: '90%'}}
            required
            label="Book Name"
            value={bookName}
            margin="normal"
            onChange={e => setBookName(e.target.value)}
          />
          <TextField
            style={{width: '90%'}}
            required
            label="Book Number"
            type="number"
            value={bookNo}
            margin="normal"
            onChange={e => setBookNo(e.target.value)}
          />
          <InputLabel style={{width: '90%'}}>Type: 
            <Select
              style={{width: '100%'}}
              value={type}
              onChange={e => setType(e.target.value)}
              label="type"
            >
              <MenuItem style={{minWidth: '90%'}} value='Baptismal'>Baptismal</MenuItem>
              <MenuItem style={{minWidth: '90%'}} value='Confirmation'>Confirmation</MenuItem>
              <MenuItem style={{minWidth: '90%'}} value='Death'>Death</MenuItem>
              <MenuItem style={{minWidth: '90%'}} value='Marriage'>Marriage</MenuItem>
            </Select>
          </InputLabel>
          <Button variant="contained">
            ADD
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  )
}