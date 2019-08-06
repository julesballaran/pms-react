import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Paper,
  Grid,
  Tooltip,
  Dialog,
  Button,
  CircularProgress,
} from '@material-ui/core/'
import {
  Book,
  Delete,
  Unarchive,
  Archive,
} from '@material-ui/icons/'
import ImportData from './ImportData'
import ExportData from './ExportData'

export default function DisplayBooks(props) {
  const { bookList, baptismal, confirmation, death, marriage, fetchData, type } = props
  const [delDialog, setDelDialog] = useState(false)
  const [imp, setImp] = useState(false)
  const [delBook, setDelBook] = useState({})
  const [selectedBook, setSelectedBook] = useState({})
  const [exp, setExp] = useState(false)
  const [b, setB] = useState({})
  const [rem, setRem] = useState(0)
  const [load, setLoad] = useState(false)
  const [done, setDone] = useState(false)

  const removeBook = (book) => {
    setDelDialog(false)
    setLoad(true)
    axios
    .get(`http://localhost:9090/${book.type}?book=${book.bookNo}`)
      .then(res => {
        res.data.map((e, i)=> {
          setTimeout(()=>{
            axios.delete(`http://localhost:9090/${e.type}/${e.id}`)
              .then(() => {
                setRem(res.data.length - i)
              })

            if(res.data.length - 1 === i){
              axios
                .delete(`http://localhost:9090/books/${book.id}`)
                .then(()=>{
                  setDone(true)
                  setLoad(false)
                })
            }
          }, i * 100)
        })
        if(res.data.length === 0) {
          axios
            .delete(`http://localhost:9090/books/${book.id}`)
            .then(()=>{
              setDone(true)
              setLoad(false)
            })
        }
      })
  }

  const removeEntries = (type, no) => {
    axios
    .get(`http://localhost:9090/${type}?book=${no}`)
      .then(res => res.data.map((e, i)=> {
        setTimeout(()=>{
          axios.delete(`http://localhost:9090/${type}/${e.id}`)
        }, i * 100)
      }))
      .finally(()=>{
        fetchData()
        setDelDialog(false)
      })
  }

  const handleExport = book => {
    setExp(true)
    setB(book)
  }

  return (
    <Grid
      container
      direction="row"
    >
      {bookList.map(book => (
        book.type.match(type) ?
          <Grid key={book.id} style={{margin: 20}}>
            <Paper className='papel'>
            <Link className='book-style' to={`${book.type}/${book.bookNo}`} style={{textDecoration: 'none'}}>
              <Book style={{fontSize: 100,}}/>
              <h4>Book {book.bookNo}</h4>
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
              <div className='actions' onClick={()=> setSelectedBook(book)}>
                <Tooltip title="Import">
                  <Unarchive onClick={()=>setImp(true)}/>
                </Tooltip>
                <Tooltip title="Backup">
                  <Archive onClick={() => handleExport(book)}/>
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
          : type === 'all' ?
          <Grid key={book.id} style={{margin: 20}}>
            <Paper className='papel'>
            <Link className='book-style' to={`${book.type}/${book.bookNo}`} style={{textDecoration: 'none'}}>
              <Book style={{fontSize: 100,}}/>
              <h4>Book {book.bookNo}</h4>
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
              <div className='actions' onClick={()=> setSelectedBook(book)}>
                <Tooltip title="Import">
                  <Unarchive onClick={()=>setImp(true)}/>
                </Tooltip>
                <Tooltip title="Backup">
                  <Archive onClick={() => handleExport(book)}/>
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
          : null

      ))}
      <Dialog 
        open={delDialog}
        onClose={()=>setDelDialog(false)}
        className='del-dialog'
      >
        <h3>Delete Book {delBook.bookNo}?</h3>
        <div className='del-dialog-btn'>
          <Button variant='contained' onClick={()=> setDelDialog(false)}>Cancel</Button>  
          <Button variant='contained' color='secondary' onClick={()=>removeBook(delBook)}>Delete</Button> 
        </div>
      </Dialog>
      <Dialog open={load} onClose={() => setLoad(true)}>
        <Grid container direction="column" justify="center" alignItems="center" style={{height: 200, width: 500}}>
          <p>removing data...</p>
          <CircularProgress />
          <p>{rem} remaining</p>
        </Grid>
      </Dialog>
      <Dialog open={done} onClose={() => window.location.reload()}>
        <Grid container justify="center" direction="column" style={{padding: 20, width: 350}}>
          <div>
            <h3 style={{color: 'green', textAlign: "center"}}>Done</h3>
          </div>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Confirm</Button>
        </Grid>
      </Dialog>
      <ImportData 
        imp={imp}
        setImp={setImp}
        selectedBook={selectedBook}
        baptismal={baptismal}
        confirmation={confirmation}
        death={death}
        marriage={marriage}
      />
      {
        exp ?
          <ExportData setExp={setExp} b={b}/>
        : null
      }
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