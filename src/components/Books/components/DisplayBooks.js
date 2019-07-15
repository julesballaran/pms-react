import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Paper,
  Grid,
} from '@material-ui/core/';
import Book from '@material-ui/icons/Book';

export default function DisplayBooks(props) {
  const { bookList, baptismal, confirmation, death, marriage } = props

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {bookList.map(book => (
        <Link key={book.id} to={`${book.type}/${book.bookNo}`} style={{textDecoration: 'none'}}>
          <Paper className='book-style'>
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
          </Paper>
        </Link>
      ))}
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