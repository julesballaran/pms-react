import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import background from './img/grid2bg.jpg'
import './App.css';
import Header from './components/Header/Header'
import Sidenav from './components/Sidenav/Sidenav'
import Routes from './routes'
import axios from 'axios'

import { 
  CircularProgress,
  Grid,
} from '@material-ui/core/'

function App() {
  const [loaded, setLoaded] = useState(false)
  const [baptismal, setBaptismal] = useState([])
  const [confirmation, setConfirmation] = useState([])

  const fetchDataAll = () => {
    axios
      .get('http://localhost:9090/baptismal')
      .then(res => setBaptismal(res.data))
      .finally(fetchConfirmation)
  }

  const fetchConfirmation = () => {
    axios
      .get('http://localhost:9090/confirmation')
      .then(res => setConfirmation(res.data))
      .finally(()=>setLoaded(true))
  }

  useEffect(() => {
    fetchDataAll()
  }, [])

  return (
    <BrowserRouter>
      {loaded ?
      <div style={{display: 'flex', backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
        <Sidenav />
        <div style={{display: 'flex', flexDirection: 'column', maxWidth: 'calc(100% - 240px)', minWidth: 'calc(100% - 240px)',}}>
          <Header />
          <Routes 
            baptismal={baptismal}
            confirmation={confirmation}
            loaded={loaded}
          />
        </div>
      </div>
      : 
      <Grid 
        style={{height: '100vh'}}
        container
        direction="column"
        justify="center"
        alignItems="center"> 
        <CircularProgress />
        <p>fetching data...</p>
      </Grid>
      }
    </BrowserRouter>
  );
}

export default App;
