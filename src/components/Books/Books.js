import React from 'react'
import Paper from '@material-ui/core/Paper';
import bookImg from '../../img/book.png'
export default function Books(){
  return (
    <Paper style={{width: 100}}>
      <div style={{margin: '0 auto'}}>
        <img src={bookImg} alt='' style={{height: 50}}/>
      </div>
    </Paper>
  )
}