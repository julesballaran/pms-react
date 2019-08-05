import React, { useState } from 'react'
import axios from 'axios'
import {
  Dialog,
  Button,
  CircularProgress,
  Grid,
} from '@material-ui/core/';
import { ExcelRenderer } from 'react-excel-renderer'

export default function ImportData(props) {
  const { imp, setImp, selectedBook, baptismal, confirmation } = props
  const [done, setDone] = useState(false)
  const [load, setLoad] = useState(false)
  const [error, setError] = useState([])
  const [sec, setSec] = useState(0)
  const [current, setCurrent] = useState('')
  
  const handleFile = e => {

    setImp(false)
    setLoad(true)

    const file = e.target.files[0]
    ExcelRenderer(file, (err, res) => {
      if(err){
        console.error(err)
      } else {
        if(selectedBook.type === 'baptismal'){
          importBaptismal(res.rows)
        } else if (selectedBook.type === 'confirmation'){
          importConfirmation(res.rows)
        } else if (selectedBook.type === 'death'){
          importDeath(res.rows)
        } else if (selectedBook.type === 'marriage'){
          importMarriage(res.rows)
        }
      }
    })
  }

  const importBaptismal = arr => {
    arr.shift()
    arr.map(data => {
      axios.get(`http://localhost:9090/confirmation?book=${selectedBook.bookNo}&page=${data[0]}&no=${data[1]}&name=${data[3]}`)
        .then(res => console.log(res))
      // axios.post('http://localhost:9090/baptismal', {
      //   book: selectedBook.bookNo,
      //   page: data[0],
      //   no: data[1],
      //   date: data[2],
      //   name: data[3],
      //   father: data[4],
      //   mother: data[5],
      //   birthdate: data[6],
      //   birthplace: data[7],
      //   sponsor1: data[8],
      //   sponsor2: data[9],
      //   rev: data[10],
      //   type: 'baptismal',
      // })
      // .finally(()=>setImp(false))
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
        test.push(d)
      } else {
        setError(error.push([data[0], data[3]]))
      }
      if(i === count-1){
        test.map((t, i) => {
          setTimeout(()=>{
            setSec(test.length - i)
            setCurrent(t.name)
            axios.post('http://localhost:9090/confirmation', t)
              .catch(()=>setError(error.push([data[0], data[3]])))
            if(test.length-1 === i){
              setLoad(false)
              setDone(true)
            }
          }, i * 1000)
        })
      }
      setError(error)
    })
  }

  const importDeath = arr => {
    arr.shift()
    arr.map(data => {
      axios.post('http://localhost:9090/death', {
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
      })
      .finally(()=>setImp(false))
    })
  }

  const importMarriage = arr => {
    arr.shift()
    arr.map(data => {
      axios.post('http://localhost:9090/marriage', {
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
      })
      .finally(()=>setImp(false))
    })
  }

  return (
    <React.Fragment>
      <Dialog
        open={imp}
        onClose={()=>setImp(false)}
      >
        <Button
          variant="contained"
          component="label"
          style={{margin: 30}}
        >
          Upload File
          <input
            type="file"
            style={{ display: "none" }}
            onChange={e => handleFile(e)}
          />
        </Button>
      </Dialog>
      {
        done && error.length ?
          <Dialog open={done} onClose={() => window.location.reload()}>
            <Grid container justify="center" direction="column" style={{padding: 20, width: 350}}>
              <div>
                <h3 style={{color: 'red', textAlign: "center"}}>{error.length} Invalid Input</h3>
                {error.map((r, i) => (
                  <p key={i}>Page: <i style={{color: 'red'}}>{r[0]}</i>   Name: <i style={{color: 'red'}}>{r[1]}</i></p>
                ))} 
              </div>
              <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Confirm</Button>
            </Grid>
          </Dialog>
        : done && error.length === 0 ?
          <Dialog open={done} onClose={() => window.location.reload()}>
            <Grid container justify="center" direction="column" style={{padding: 20, width: 350}}>
              <div>
                <h3 style={{color: 'green', textAlign: "center"}}>Imported</h3>
              </div>
              <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Confirm</Button>
            </Grid>
          </Dialog>
        : null
      }
      <Dialog open={load} onClose={() => setLoad(true)}>
        <Grid container direction="column" justify="center" alignItems="center" style={{height: 200, width: 500}}>
          <p>adding {current} ...</p>
          <CircularProgress />
          <p>{sec}</p>
        </Grid>
      </Dialog>
    </React.Fragment>
  )
}