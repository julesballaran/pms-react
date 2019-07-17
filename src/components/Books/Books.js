import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import {
  Dialog,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Grid,
} from '@material-ui/core/';


import DisplayBooks from './components/DisplayBooks'

const useStyles = makeStyles({
  btnStyle: {
    width: 150,
    height: 35,
    display: 'flex',
    margin: '15px 10px 0 10px',
    fontSize: 15,
    fontWeight: 'bolder',
    border: '1px solid black',
  },
  addBtn: {
    width: 100,
    fontWeight: 'bolder',
    border: '1px solid black',
  }
})


export default function Books(props){
  const { confirmation, baptismal, death, marriage, loaded } = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [bookName, setBookName] = useState('')
  const [bookNo, setBookNo] = useState('')
  const [bookList, setBookList] = useState([])
  
  useEffect(() => {
      if(!loaded){
        props.history.push('/');
      } else {
        fetchData()
      }
    }, []) 


  const fetchData = () => {
    axios
      .get('http://localhost:9090/books')
      .then(res => setBookList(res.data))
  }

  function handleSubmit(e){
    e.preventDefault()
    if(type){
      axios
        .post('http://localhost:9090/books', {
          bookName,
          bookNo,
          type,
        })
        .then(()=>{
            setOpen(false)
            fetchData()
          }
        )
    }
  }

  return (
    <React.Fragment>
      <Grid container wrap='nowrap' justify='flex-end'>
        <Button 
          className={classes.btnStyle}
          onClick={() => setOpen(true)}
        >Add Book
        </Button>
      </Grid>
      <DisplayBooks 
        bookList={bookList}
        confirmation={confirmation}
        baptismal={baptismal}
        death={death}
        marriage={marriage}
        fetchData={fetchData}
      />
      <Dialog 
        open={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={e => handleSubmit(e)}>
          <div className="modal-style">
            <TextField
              style={{width: '80%'}}
              required
              label="Book Name"
              value={bookName}
              margin="normal"
              onChange={e => setBookName(e.target.value)}
            />
            <TextField
              style={{width: '80%'}}
              required
              label="Book Number"
              type="number"
              value={bookNo}
              margin="normal"
              onChange={e => setBookNo(e.target.value)}
            />
            <InputLabel style={{width: '80%'}}>Type: 
              <Select
                style={{width: '100%'}}
                value={type}
                onChange={e => setType(e.target.value)}
                label="type"
              >
                <MenuItem style={{minWidth: '80%'}} value='baptismal'>Baptismal</MenuItem>
                <MenuItem style={{minWidth: '80%'}} value='confirmation'>Confirmation</MenuItem>
                <MenuItem style={{minWidth: '80%'}} value='death'>Death</MenuItem>
                <MenuItem style={{minWidth: '80%'}} value='marriage'>Marriage</MenuItem>
              </Select>
            </InputLabel>
            <Button variant="contained" type="submit" className={classes.addBtn}>
              ADD
            </Button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  )
}