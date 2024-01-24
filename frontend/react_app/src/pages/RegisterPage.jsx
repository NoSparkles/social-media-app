import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useValidate from '../useValidate'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import useFetch from '../useFetch'


const RegisterPage = () => {
  const [userData, setUserData] = useValidate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [data, response, err, fetchData] = useFetch()
  const [registerError, setRegisterError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!data) {
      return
    }
    if (!response.ok && data.username || data.password) {
      setRegisterError(data.username || data.password)
    }

    if (response.status == 201) {
      fetchData('/token/', 'POST', {
        username: username,
        password: password
      })
    }

    if (response.status == 200) {
      console.log(response ,data)
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      navigate('/')
    }

  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setRegisterError('passwords does not match')
      return
    }

    fetchData('/users/', 'POST', {
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
            <form className='register-form' onSubmit={handleSubmit}>
              <h2>Register a new account</h2>
              <input required id='username' type="text" name="username" placeholder='Username' minLength={5} value={username} onChange={(e) => setUsername(e.target.value)}/>

              <input required id='password' type="password" name="password" placeholder='Password' minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}/>

              <input required id='password-confirm' type="password" name="password-confirm" placeholder='Confirm password' minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

              {
                registerError ? (
                  <p className='error-color'>{registerError}</p>
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