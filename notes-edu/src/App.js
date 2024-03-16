import React from 'react';
import './css/App.css';
import { Notes_EDU_APP } from './Notes_EDU_APP';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        {/* Whole App Component */}
        <Notes_EDU_APP />
      </BrowserRouter>

    </>
  );
}

export default App;
