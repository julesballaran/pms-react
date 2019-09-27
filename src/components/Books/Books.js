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

import Close from '@material-ui/icons/Close'
import DisplayBooks from './components/DisplayBooks'

import { saveAs } from 'file-saver'
import baptismalXlsx from '../../data/baptismal-test.xlsx'
import confirmationXlsx from '../../data/confirmation-test.xlsx'
import deathXlsx from '../../data/death-test.xlsx'
import marriageXlsx from '../../data/marriage-test.xlsx'

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
    width: 200,
    fontWeight: 'bolder',
    border: '1px solid black',
    margin: 10
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
  const [temp, setTemp] = useState(false)
  
  useEffect(() => {
    document.title = 'Books - PMS'
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
      <Grid container>
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
        <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
          <Button 
            className={classes.btnStyle}
            onClick={() => setTemp(true)}
          >Template
          </Button>
          <Button 
            className={classes.btnStyle}
            onClick={() => setOpen(true)}
          >Add Book
          </Button>
        </div>
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
        open={temp}
        onClose={() => setTemp(false)}
      >
        <div style={{background: '#3f51b5', padding: 16}}>
          <Grid container>
            <h3 style={{color: 'white', margin: 0}}>Excel Templates</h3>
            <Close 
              style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
              onClick={()=>setTemp(false)}
            />
          </Grid>
        </div>
        <Grid
          direction='column'
          style={{padding: 10}}
        >
          <Grid
            justify='center'
            alignItems='center'
          >
            <Button 
              className={classes.addBtn}
              onClick={() => saveAs(baptismalXlsx, 'baptismal-excel-template.xlsx')}
            >Baptismal</Button>
            <Button 
              className={classes.addBtn}
              onClick={() => saveAs(confirmationXlsx, 'confirmation-excel-template.xlsx')}
            >Confirmation</Button>
          </Grid>
          <Grid
            justify='center'
            alignItems='center'
          >
            <Button 
              className={classes.addBtn}
              onClick={() => saveAs(deathXlsx, 'death-excel-template.xlsx')}
            >Death</Button>
            <Button 
              className={classes.addBtn}
              onClick={() => saveAs(marriageXlsx, 'marriage-excel-template.xlsx')}
            >Marriage</Button>
          </Grid>
        </Grid>
      </Dialog>


      <Dialog 
        open={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={e => handleSubmit(e)}>
          <div style={{background: '#3f51b5', padding: 16}}>
            <Grid container>
              <h3 style={{color: 'white', margin: 0}}>Add Book</h3>
              <Close 
                style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
                onClick={()=>setOpen(false)}
              />
            </Grid>
          </div>
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