import React from 'react'

import { 
  CircularProgress,
  Grid,
} from '@material-ui/core/'

export default function Loader(props) {
  return (
    <Grid 
      style={{height: '100vh'}}
      container
      direction="column"
      justify="center"
      alignItems="center"> 
      <CircularProgress />
      <p>{props.text}</p>
    </Grid>
  )
}