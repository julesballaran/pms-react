import React from 'react'
import axios from 'axios'
import {
  Dialog,
  Button,
} from '@material-ui/core/';
import { ExcelRenderer } from 'react-excel-renderer'

export default function ImportData(props) {
  const { imp, setImp, selectedBook } = props
  
  const handleFile = e => {
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
      axios.post('http://localhost:9090/baptismal', {
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
      })
      .finally(()=>setImp(false))
    })
  }

  const importConfirmation = arr => {
    arr.shift()
    arr.map(data => {
      axios.post('http://localhost:9090/confirmation', {
        book: selectedBook.bookNo,
        page: data[0],
        no: data[1],
        date: data[2],
        name: data[3],
        father: data[4],
        mother: data[5],
        rev: data[6],
        type: 'confirmation',
      })
      .finally(()=>setImp(false))
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
  )
}