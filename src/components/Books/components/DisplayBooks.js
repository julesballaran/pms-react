import React, { useState, useEffect } from 'react'
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Paper,
  Grid,
  Tooltip,
  Dialog,
  Button,
} from '@material-ui/core/';
import {
  Book,
  Delete,
  Unarchive,
  Archive
} from '@material-ui/icons/';
import ImportData from './ImportData'

export default function DisplayBooks(props) {
  const { bookList, baptismal, confirmation, death, marriage, fetchData } = props
  const [delDialog, setDelDialog] = useState(false)
  const [imp, setImp] = useState(false)
  const [back, setBack] = useState(false)
  const [delBook, setDelBook] = useState({})

  const removeBook = (book) => {
    axios
      .delete(`http://localhost:9090/books/${book.id}`)
      .then(() => removeEntries(book.type, book.bookNo))
  }

  const removeEntries = (type, no) => {
    axios
    .get(`http://localhost:9090/${type}?book=${no}`)
      .then(res => res.data.map(e => axios.delete(`http://localhost:9090/${type}/${e.id}`)))
      .finally(()=>{
        fetchData()
        setDelDialog(false)
      })
  }

  return (
    <Grid
      container
      direction="row"
    >
      {bookList.map(book => (
        <Grid key={book.id} style={{margin: 20}}>
          <Paper className='papel'>
          <Link className='book-style' to={`${book.type}/${book.bookNo}`} style={{textDecoration: 'none'}}>
            <Book style={{fontSize: 100,}}/>
            <h4>{book.bookName}</h4>
            <p>{book.type}</p>
            <EntryCount 
              no={book.bookNo}
              book={
                book.type === 'baptismal' ? baptismal 
                : book.type === 'confirmation' ? confirmation 
                : book.type === 'death' ? death 
                : marriage
              }
            />
            </Link>
            <div className='actions'>
              <Tooltip title="Import">
                <Unarchive onClick={()=>setImp(true)}/>
              </Tooltip>
              <Tooltip title="Backup">
                <Archive />
              </Tooltip>
              <Tooltip title="Delete">
                <Delete onClick={()=>{
                  setDelBook(book)
                  setDelDialog(true)
                }}/>
              </Tooltip>
            </div>
          </Paper>
        </Grid>
      ))}
      <Dialog 
        open={delDialog}
        onClose={()=>setDelDialog(false)}
        className='del-dialog'
      >
        <h3>Delete {delBook.bookName}?</h3>
        <div className='del-dialog-btn'>
          <Button variant='contained' onClick={()=> setDelDialog(false)}>Cancel</Button>  
          <Button variant='contained' color='secondary' onClick={()=>removeBook(delBook)}>Delete</Button> 
        </div>
      </Dialog>
      <ImportData 
        imp={imp}
        setImp={setImp}
      />
    </Grid>
  )
}

function EntryCount(props){
  const [count, setState] = useState(0)

  useEffect(()=>{
    setState(props.book.filter(b => b.book === props.no).length)
  },[])

  return (
    <p>{count} entries</p>
  )
}