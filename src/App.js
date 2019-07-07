import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import background from './img/grid2bg.jpg'
import './App.css';
import Header from './components/Header/Header'
import Sidenav from './components/Sidenav/Sidenav'
import Routes from './routes'

function App() {
  return (
    <BrowserRouter>
      <div style={{display: 'flex', backgroundImage: `url(${background})`}}>
        <Sidenav />
        <div style={{display: 'flex', flexDirection: 'column', maxWidth: 'calc(100% - 240px)', minWidth: 'calc(100% - 240px)',}}>
        <Header />
        <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
