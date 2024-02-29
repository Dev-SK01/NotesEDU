import React from 'react'
import './css/App.css'

const Header = () => {
    return (
        // creates HTML header With Inline CSS
        <header className='header'>
            <h1 style={{fontSize:'2rem',fontWeight:'bolder'}}>Notes Edu</h1>
        </header>
    )
}

export { Header };
