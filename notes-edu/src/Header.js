import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/App.css'
const Header = () => {
    const [quote , setQuote] = useState('Loading......');
    console.log(quote);
     async function getQuotes(){
        try{
            const API_URL = 'https://api.adviceslip.com/advice'
            const response = await fetch(API_URL);
            const data = await response.json();
            // console.log(data.slip.advice)
            setQuote(data.slip.advice);
        }catch(err){
            setQuote(err);
        }
       
    }
    getQuotes();
    return (
            <section className='main-nav'>
                <div className="celebration" id='celebration'>

                </div>
                <header className='header'>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bolder' }}>Notes Edu</h1>
                </header>
                <div className="router">
                    <p><Link to='NotesEDU/journal'>Journal APP</Link></p>
                    <p><Link to='NotesEDU/todo'>Todo APP</Link></p>
                </div>
               <p className="quote">{quote}</p>

            </section>
        
    )
}

export default Header