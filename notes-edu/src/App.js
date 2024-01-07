import React from 'react';
import './App.css';
import { Notes_EDU_APP } from './Notes_EDU_APP';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Notes_EDU_APP />
      </BrowserRouter>

    </>
  );
}

export default App;
