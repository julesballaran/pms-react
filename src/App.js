import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import background from './img/grid2bg.jpg'
import './App.css';
import Header from './components/Header/Header'
import Routes from './routes'
import axios from 'axios'
import Loader from './loader'

const url = `http://${window.location.hostname}:9090`

function App() {
  const [loaded, setLoaded] = useState(false)
  const [baptismal, setBaptismal] = useState([])
  const [confirmation, setConfirmation] = useState([])
  const [death, setDeath] = useState([])
  const [marriage, setMarriage] = useState([])
  const [edited, setEdited] = useState(false)

  const fetchDataAll = () => {
    setLoaded(false)
    axios
      .get(url + '/baptismal')
      .then(res => setBaptismal(res.data))
      .finally(fetchConfirmation)
  }

  const fetchConfirmation = () => {
    axios
      .get(url + '/confirmation')
      .then(res => setConfirmation(res.data))
      .finally(fetchDeath)
  }

  const fetchDeath = () => {
    axios
      .get(url + '/death')
      .then(res => setDeath(res.data))
      .finally(fetchMarriage)
  }

  const fetchMarriage = () => {
    axios
      .get(url + '/marriage')
      .then(res => setMarriage(res.data))
      .finally(()=>setLoaded(true))
  }

  useEffect(() => {
    document.title = 'PMS'
    fetchDataAll()
  }, [])

  return (
    <BrowserRouter>
      {loaded ?
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          height: 'auto', width: '100%', minHeight: '100vh',
          backgroundImage: `url(${background})`, 
          backgroundSize: 'cover'}}>
          <Header />
          <Routes 
            baptismal={baptismal}
            confirmation={confirmation}
            death={death}
            marriage={marriage}
            fetchDataAll={fetchDataAll}
            loaded={loaded}
            edited={edited}
            setEdited={setEdited}
            url={url}
          />
        </div>
      : 
      <Loader text={'fetching data...'}/>
      }
    </BrowserRouter>
  );
}

export default App;
