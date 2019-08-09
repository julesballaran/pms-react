import React, { useState } from 'react'
import axios from 'axios'
import {
  Dialog,
  Button,
  CircularProgress,
  Grid,
  Input,
} from '@material-ui/core/';

import Close from '@material-ui/icons/Close'
import { ExcelRenderer } from 'react-excel-renderer'

let timer = []

export default function ImportData(props) {
  const { imp, setImp, selectedBook, baptismal, confirmation, death, marriage, url } = props
  const [done, setDone] = useState(false)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState([])
  const [sec, setSec] = useState(0)
  const [current, setCurrent] = useState('')
  const [file, setFile] = useState(null)
  const [complete, setComplete] = useState(0)
  const [err, setErr] = useState(false)
  const [inval, setInval] = useState(false)
  
  const handleFile = () => {

    if(!file) {
      return
    }
    
    setImp(false)
    setLoad(true)

    ExcelRenderer(file, (err, res) => {
      if(err){
        console.error(err)
      } else {
        if(selectedBook.type === 'baptismal'){
          if(res.cols.length === 11){
           importBaptismal(res.rows)
          } else {
            setLoad(false)
            setInval(true)
          }
        } else if (selectedBook.type === 'confirmation'){
          if(res.cols.length === 7){
            importConfirmation(res.rows)
          } else {
            setLoad(false)
            setInval(true)
          }
        } else if (selectedBook.type === 'death'){
          if(res.cols.length === 14){
            importDeath(res.rows)
          } else {
            setLoad(false)
            setInval(true)
          }
        } else if (selectedBook.type === 'marriage'){
          if(res.cols.length === 20){
            importMarriage(res.rows)
          } else {
            setLoad(false)
            setInval(true)
          }
        }
      }
    })
  }

  const clearTimer = (i, n) => {
    while(i < n){
      clearTimeout(timer[i])
      i++;
    }
    setDone(true)
    setLoad(false)
    setErr(true)
  }

  const importBaptismal = arr => {
    arr.shift()
    let test = [], d
    let count  = arr.length
    arr.map((data, i) => {
      if(!baptismal.find(c => c.book === selectedBook.bookNo && c.page === data[0] && c.no === data[1] && c.name === data[3])){
        d = {
          book: selectedBook.bookNo,
          page: data[0],
          no: data[1],
          date: data[2],
          name: data[3],
          father: data[4],
          mother: data[5],
          birthdate: data[6],
          birthplace: data[7],
          sponsor1: data[8],
          sponsor2: data[9],
          rev: data[10],
          type: 'baptismal',
        }
        if(!test.find(te => te.book===selectedBook.bookNo && te.page===data[0] && te.no===data[1] && te.name===data[3])){
          test.push(d)
        } else {
          setError(error.push([data[0], data[3]]))
        }
      } else {
        setError(error.push([data[0], data[3]]))
      }
      if(i === count-1){
        if(test.length === 0) {
          setLoad(false)
          setDone(true)
        }
        test.map((t, i) => {
          timer[i] = setTimeout(()=>{
            setSec(test.length - i)
            setCurrent(t.name)
            setComplete((i / test.length) * 100)
            axios.post(url + '/baptismal', t)
              .catch(() => clearTimer(i, test.length))
            if(test.length-1 === i){
              setLoad(false)
              setDone(true)
            }
          }, i * 200)
        })
      }
      setError(error)
    })
  }

  const importConfirmation = arr => {
    arr.shift()
    let test = [], d
    let count  = arr.length
    arr.map((data, i) => {
      if(!confirmation.find(c => c.book === selectedBook.bookNo && c.page === data[0] && c.no === data[1] && c.name === data[3])){
        d = {
          book: selectedBook.bookNo,
          page: data[0],
          no: data[1],
          date: data[2],
          name: data[3],
          father: data[4],
          mother: data[5],
          rev: data[6],
          type: 'confirmation',
        }
        if(!test.find(te => te.book===selectedBook.bookNo && te.page===data[0] && te.no===data[1] && te.name===data[3])){
          test.push(d)
        } else {
          setError(error.push([data[0], data[3]]))
        }
      } else {
        setError(error.push([data[0], data[3]]))
      }
      if(i === count-1){
        if(test.length === 0) {
          setLoad(false)
          setDone(true)
        }
        test.map((t, i) => {
          setTimeout(()=>{
            setSec(test.length - i)
            setCurrent(t.name)
            setComplete((i / test.length) * 100)
            axios.post(url + '/confirmation', t)
              .catch(() => clearTimer(i, test.length))
            if(test.length-1 === i){
              setLoad(false)
              setDone(true)
            }
          }, i * 200)
        })
      }
      setError(error)
    })
  }

  const importDeath = arr => {
    arr.shift()
    let test = [], d
    let count  = arr.length
    arr.map((data, i) => {
      if(!death.find(c => c.book === selectedBook.bookNo && c.page === data[0] && c.name === data[2])){
        d = {
          book: selectedBook.bookNo,
          page: data[0],
          date: data[1],
          name: data[2],
          age: data[3],
          father: data[4],
          mother: data[5],
          spouse: data[6],
          nationality: data[7],
          residence: data[8],
          civilstatus: data[9],
          dateofdeath: data[10],
          causeofdeath: data[11],
          placeofburial: data[12],
          rev: data[13],
          type: 'death',
        }
        if(!test.find(te => te.book===selectedBook.bookNo && te.page===data[0] && te.name===data[2])){
          test.push(d)
        } else {
          setError(error.push([data[0], data[2]]))
        }
      } else {
        setError(error.push([data[0], data[2]]))
      }
      if(i === count-1){
        if(test.length === 0) {
          setLoad(false)
          setDone(true)
        }
        test.map((t, i) => {
          setTimeout(()=>{
            setSec(test.length - i)
            setCurrent(t.name)
            setComplete((i / test.length) * 100)
            axios.post(url + '/death', t)
              .catch(() => clearTimer(i, test.length))
            if(test.length-1 === i){
              setLoad(false)
              setDone(true)
            }
          }, i * 200)
        })
      }
      setError(error)
    })
  }

  const importMarriage = arr => {  
    arr.shift()
    let test = [], d
    let count  = arr.length
    arr.map((data, i) => {
      if(!marriage.find(c => c.book === selectedBook.bookNo && c.page === data[0] && c.name === data[2] && c.name2 === data[3])){
        d = {
          book: selectedBook.bookNo,
          page: data[0],
          date: data[1],
          name: data[2],
          name2: data[3],
          age: data[4],
          age2: data[5],
          father: data[6],
          mother: data[7],
          father2: data[8],
          mother2: data[9],
          nationality: data[10],
          nationality2: data[11],
          residence: data[12],
          residence2: data[13],
          civilstatus: data[14],
          civilstatus2: data[15],
          witness: data[16],
          witness2: data[17],
          placeofmarriage: data[18],
          rev: data[19],
          type: 'marriage',
        }
        if(!test.find(te => te.book===selectedBook.bookNo && te.page===data[0] && te.name===data[2] && te.name2 === data[3])){
          test.push(d)
        } else {
          setError(error.push([data[0], `${data[2]} & ${data[3]}`]))
        }
      } else {
        setError(error.push([data[0], `${data[2]} & ${data[3]}`]))
      }
      if(i === count-1){
        if(test.length === 0) {
          setLoad(false)
          setDone(true)
        }
        test.map((t, i) => {
          setTimeout(()=>{
            setSec(test.length - i)
            setCurrent(`${t.name} & ${t.name2}`)
            setComplete((i / test.length) * 100)
            axios.post(url + '/marriage', t)
              .catch(() => clearTimer(i, test.length))
            if(test.length-1 === i){
              setLoad(false)
              setDone(true)
            }
          }, i * 200)
        })
      }
      setError(error)
    })
  }

  return (
    <React.Fragment>
      <Dialog
        open={imp}
        onClose={()=>{
          setImp(false)
          setFile(null)
        }}
      > 
          <div style={{background: '#3f51b5', padding: 16}}>
            <Grid container>
              <h3 style={{color: 'white', margin: 0, padding: 0}}>Import Book</h3>
              <Close 
                style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
                onClick={()=>{
                  setImp(false)
                  setFile(null)
                }}
              />
            </Grid>
          </div>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            style={{padding: 30}}
          />
          <Grid container justify="center">
            <Button 
              style={{color: '#3f51b5', border: '1px solid #3f51b5', width: '70%', marginBottom: 20}} 
              onClick={handleFile}
            >
              Import
            </Button>
          </Grid>
      </Dialog>
      {
        done && err ?  
          <Dialog open={done} onClose={() => window.location.reload()}>
            <Grid container justify="center" direction="column" style={{padding: 20, width: 350}}>
              <div>
                <h3 style={{color: 'red', textAlign: "center"}}>An error occurred, please reload the page</h3>
              </div>
              <Button style={{color: 'red', border: '1px solid red'}} onClick={() => window.location.reload()}>Reload</Button>
            </Grid>
          </Dialog>
        : done && error.length ?
          <Dialog open={done} onClose={() => window.location.reload()}>
            <Grid container justify="center" direction="column" style={{padding: 20, width: 350}}>
              <div>
                <h3 style={{color: 'red', textAlign: "center"}}>{error.length} Invalid Input</h3>
                {error.map((r, i) => (
                  <p key={i}>Page: <i style={{color: 'red'}}>{r[0]}</i>   Name: <i style={{color: 'red'}}>{r[1]}</i></p>
                ))} 
              </div>
              <Button style={{color: 'red', border: '1px solid red'}} onClick={() => window.location.reload()}>Confirm</Button>
            </Grid>
          </Dialog>
        : done && error.length === 0 ?
          <Dialog open={done} onClose={() => window.location.reload()}>
            <Grid container justify="center" direction="column" style={{padding: 20, width: 350}}>
              <div>
                <h3 style={{color: 'green', textAlign: "center"}}>Success</h3>
              </div>
              <Button style={{color: 'green', border: '1px solid green'}} onClick={() => window.location.reload()}>Confirm</Button>
            </Grid>
          </Dialog>
        : null
      }
      <Dialog open={load} onClose={() => setLoad(true)}>
        <div style={{background: '#3f51b5', padding: 16}}>
          <Grid container>
            <h3 style={{color: 'white', margin: 0, padding: 0}}>{complete.toFixed(2)}%</h3>
          </Grid>
        </div>
        <Grid container direction="column" justify="center" alignItems="center" style={{height: 200, width: 500}}>
          <p>adding {current} ...</p>
          <CircularProgress variant="static" value={complete}/>
          <p>{sec} remaining</p>
        </Grid>
      </Dialog>
      <Dialog open={inval} onClose={() => setInval(false)}>
        <Grid container justify="center" direction="column" style={{padding: 20, width: 350}}>
          <div>
            <h3 style={{color: 'red', textAlign: "center"}}>Invalid Excel file!</h3>
            <Close 
              style={{color: 'white', marginLeft: 'auto', cursor: 'pointer'}}
              onClick={()=>setInval(false)}
            />
          </div>
          <Button style={{color: 'red', border: '1px solid red'}} onClick={()=>setInval(false)}>Close</Button>
        </Grid>
      </Dialog>
    </React.Fragment>
  )
}