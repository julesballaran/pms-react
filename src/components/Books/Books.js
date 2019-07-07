import React, {useState, useEffect} from 'react'
import axios from 'axios'
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
  const [bookList, setBookList] = useState([])
  
  useEffect(
    () => {
      axios
        .get('http://localhost:9090/books')
        .then(res => setBookList(res.data))
    }, []
  ) 

  function handleSubmit(e){
    e.preventDefault()
    if(type){
      axios
        .post('http://localhost:9090/books', {
          bookName,
          bookNo,
          type,
        })
        .then(window.location.reload())
    }
  }

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
        {bookList.map(book => (
          <Paper className='book-style' key={book.id}>
            <Book style={{fontSize: 120,}}/>
            <h3>{book.bookName}</h3>
            <p>{book.type}</p>
            <p>200 entries</p>
          </Paper>
        ))}
      </Grid>

      <Modal 
        open={open}
        onClose={() => setOpen(false)}
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <form onSubmit={e => handleSubmit(e)}>
          <div className="modal-style">
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
            <Button variant="contained" type="submit">
              ADD
            </Button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  )
}