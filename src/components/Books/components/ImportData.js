import React from 'react'
import {
  Dialog,
  Button,
} from '@material-ui/core/';

export default function ImportData(props) {
  const { imp, setImp} = props
  
  const handleFile = e => {
    console.log(e.target.files[0])
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