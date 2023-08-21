import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/register';
import Chat from './pages/chat';
import Login from './pages/login';
import CreateAvatar from './pages/createAvatar';
export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/register' element={ <Register/>}/>
    <Route path='/login' element={ <Login/>}/>
    <Route path='/chat' element={ <Chat/>}/>
    <Route path='/createAvatar' element={ <CreateAvatar/>}/>
  </Routes>
  </BrowserRouter>
}
