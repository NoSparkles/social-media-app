import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useValidate from '../useValidate'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const [userData, setUserData] = useValidate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setPasswordError('Passwords does not match')
      return
    }
    let endpoint = 'http://localhost:8000/api/users/'
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(data=>{
      if (data.username === username){
        getToken()
      }
    })
  }

  const getToken = () => {
    let endpoint = 'http://localhost:8000/api/token/'
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(data=>{
        if (!data.detail){
          localStorage.setItem('access', data.access)
          localStorage.setItem('refresh', data.refresh)
          navigate('/')
        }
    })
  }

  return (
    <>
      {
        userData ? (
          navigate('/')
        ) : (
          <>
            <Navbar userData={userData} setUserData={setUserData}/>
            <form className='register-form' onSubmit={handleSubmit}>
              <h2>Register a new account</h2>
              <input required id='username' type="text" name="username" placeholder='Username' minLength={5} value={username} onChange={(e) => setUsername(e.target.value)}/>

              <input required id='password' type="password" name="password" placeholder='Password' minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}/>

              <input required id='password-confirm' type="password" name="password-confirm" placeholder='Confirm password' minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

              {
                passwordError ? (
                  <p className='error'>{passwordError}</p>
                ) : (
                  <></>
                )
              }

              <div className='log-sign-in'>
                <p>Already have an acount?</p>
                <Link className='log-sign-in-link' to="/login/">Log in</Link>
              </div>

              <button type="submit">Submit</button>

            </form>
          </>
        )
      }
    </>
    
  )
}

export default RegisterPage