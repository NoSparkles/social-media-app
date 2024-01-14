import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import useValidate from '../useValidate'

import Navbar from '../components/Navbar'
import useFetch from '../useFetch'

const LoginPage = () => {
  const [userData, setUserData] = useValidate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, response, error, fetchData] = useFetch()
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!data) {
      return
    }
    if (response.status === 401) {
      setLoginError(data.detail)
    }
    if (response.ok) {
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      navigate('/')
    }

  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData('/token/', 'POST', {
      username: username,
      password: password
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

                {
                  loginError ? (
                    <p className='error-color'>
                      {loginError}
                    </p>
                  ) : (
                    <></>
                  )
                }

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