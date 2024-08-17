import React from 'react'
import {
    HashRouter,
    Route,Routes
  } from "react-router-dom";
import Home from './components/Home';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import "./index.css"
export default function App(){
  
    return(
        <HashRouter>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/firstPage"  element={ <FirstPage/>} />
                <Route path="/secondPage" element={ <SecondPage/> } />

            </Routes>
        
        </HashRouter>
    )

}

/**
 *            
 */