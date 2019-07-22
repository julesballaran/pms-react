import React from 'react'
import axios from 'axios'
import {
  Dialog,
  Button,
} from '@material-ui/core/';
import { ExcelRenderer } from 'react-excel-renderer'

export default function ImportData(props) {
  const { imp, setImp, selectedBook} = props
  
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
        }
      }
    })
  }

  const importBaptismal = arr => {
    arr.shift()
  }

  const importConfirmation = arr => {
    arr.shift()
    arr.map(data => {
      axios
        .post('http://localhost:9090/confirmation', {
          book: selectedBook.bookNo,
          page: data[0],
          no: data[1],
          name: data[2],
          father: data[3],
          mother: data[4],
          date: data[5],
          rev: data[6],
          type: 'confirmation'
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