import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css';
import Header from './components/Header/Header'
import Sidenav from './components/Sidenav/Sidenav'
import Routes from './routes'

function App() {
  return (
    <BrowserRouter>
      <div style={{display: 'flex',}}>
        <Sidenav />
        <div style={{display: 'flex', flexDirection: 'column', width: '100%',}}>
        <Header />
        <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
