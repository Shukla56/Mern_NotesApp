import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndPoint';
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/AuthSlice';


export default function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [value,setValue]=useState({
    email:"",
    password:""
  })

  const hanldeChange=(e)=>{

    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          const request= await post('/auth/login',value)
          // const request= await axios.post('http://localhost:5000/auth/login',value)
         
          const response= request.data
          if (response.success) {
             toast.success(response.message)
              dispatch(addUser(response.user))
             navigate('/')
          }
          console.log(response)
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.message)
          
          }
          console.log('error',error)
        }
  }
  
  return (
    <div className='container min-vh-100 d-flex justify-content-center align-items-center '>
      <div className='form-container border shadow p-5 rounded-4 bg-white'>
        <h2 className='text-center mb-4 fw-bold'>Login</h2>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>

          <div className="form-group mb-3">
          <label htmlFor="email" className='form-label'>Email</label>

            <input type="email" value={value.email} onChange={hanldeChange} name='email' className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon2"/>
          </div>

          <div className='form-group mb-3'>
            
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" value={value.password} onChange={hanldeChange} name='password' className='form-control' placeholder='Enter your password' id="password"/>
          </div>

          <button className='btn btn-success w-100 mb-3'>Login</button>

          <div className='text-center'>
            <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
