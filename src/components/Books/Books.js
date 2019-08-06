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
  FormControl,
} from '@material-ui/core/';


import DisplayBooks from './components/DisplayBooks'

const useStyles = makeStyles({
  btnStyle: {
    width: 150,
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
  const { confirmation, baptismal, death, marriage, loaded, edited, url } = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('')
  const [bookNo, setBookNo] = useState('')
  const [bookList, setBookList] = useState([])
  const [errAdd, setErrAdd] = useState(false)
  const [type2, setType2] = useState('all')
  
  useEffect(() => {
      if(edited) {
        window.location.reload()
      }
      if(!loaded){
        props.history.push('/');
      } else {
        fetchData()
      }
    }, []) 


  const fetchData = () => {
    axios
      .get(url + '/books')
      .then(res => setBookList(res.data))
  }

  function handleSubmit(e){
    e.preventDefault()
    if(type){
      if(!bookList.find(b => b.bookNo === bookNo && b.type === type)){
        setErrAdd(false)
        axios
          .post(url + '/books', {
            bookNo,
            type,
          })
          .then(res=>{
            setOpen(false)
            setBookList([...bookList, res.data])
          })
      } else {
        setErrAdd(true)
      }
    }
  }

  return (
    <Grid container wrap='nowrap' direction="column" style={{padding: '0 50px'}}>
      <Grid container style={{marginTop: 10}}>
        <Grid>
          <FormControl>
            <InputLabel htmlFor="type">Type</InputLabel>
            <Select
              style={{width: 200}}
              value={type2}
              onChange={e => setType2(e.target.value)}
              label="type"
              id="type"
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='baptismal'>Baptismal</MenuItem>
              <MenuItem value='confirmation'>Confirmation</MenuItem>
              <MenuItem value='death'>Death</MenuItem>
              <MenuItem value='marriage'>Marriage</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid style={{marginLeft: 'auto'}}>
          <Button 
            className={classes.btnStyle}
            onClick={() => setOpen(true)}
          >Add Book
          </Button>
        </Grid>
      </Grid>
      <DisplayBooks
        type={type2}
        bookList={bookList}
        confirmation={confirmation}
        baptismal={baptismal}
        death={death}
        marriage={marriage}
        fetchData={fetchData}
        url={url}
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
              label="Book Number"
              type="number"
              value={bookNo}
              margin="normal"
              onChange={e => {
                setErrAdd(false)
                setBookNo(e.target.value)
              }}
              error={errAdd}
              helperText={errAdd ? `Book ${bookNo} already added` : ''}
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
    </Grid>
  )
}