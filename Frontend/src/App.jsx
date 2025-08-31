import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import ProtectedRoutes from './routes/ProtectedRoutes';

export default function App() {
  return (
  <>
  <BrowserRouter>
  <Toaster/>
  <Routes>
    <Route path='/' element={<ProtectedRoutes/>}>
        <Route index element={<Home/>}></Route>
    
    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>
  
  </BrowserRouter>
  
  
  </>
  )
}