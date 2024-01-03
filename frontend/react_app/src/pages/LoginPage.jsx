import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useValidate from '../useValidate'

import Navbar from '../components/Navbar'

const LoginPage = () => {
  const [userData, setUserData] = useValidate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    getToken()
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
              <form className='login-form' onSubmit={handleSubmit}>
                <h2>Log in to account</h2>
                <input required type="text" name="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input required type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>

                <div className='log-sign-in'>
                  <p>Don't have an account?</p>
                  <Link className='log-sign-in-link' to="/register/">Sign in</Link>
                </div>


                <button type="submit">Submit</button>
              </form>
            </>
          )
        }
      
      
      </>
  )
}

export default LoginPage