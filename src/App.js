import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css';
import Header from './components/Header/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
