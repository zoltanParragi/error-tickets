import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//import Register from './components/Register';
//import Login from './components/Login';
//import Profile from './components/Profile';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AddTicket from './components/AddTicket';
import Clients from './components/Clients';
import Tickets from './components/Tickets';
import { ContextProvider } from './ContextProvider'

function Main() {;

    return(
        <ContextProvider>
            <BrowserRouter>
                    <Navbar />
                
                <div className='p-5'>
                    <Routes>
                        <Route index element={<Home />}/>
                        <Route path="add-ticket" element={<AddTicket />}/>
                        <Route path="login" element={<Login />}/>
                        <Route path="clients" element={<Clients />}/>
                        <Route path="tickets" element={<Tickets />}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </ContextProvider>
    )
    
};

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
