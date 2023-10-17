import { useEffect, useState } from 'react'

// in order to logout use setUserData(null) (only null works)
// if userData === undefined -> haven't retrieved user's data yet
// if user's data === 0 -> loggedIn = false (You can redirect to home page or etc.)

const useValidate = () => {
  const [loggedIn, setLoggedIn] = useState(undefined)
  const [userData, setUserData] = useState(undefined)
  const [refreshIntervalId, setRefreshIntervalId] = useState(null)

  useEffect(() => {
    validateToken()
  }, [])

  useEffect(() => {
    if (loggedIn === false){
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      clearInterval(refreshIntervalId)
      setRefreshIntervalId(null)
      if (userData !== null){
        setUserData(0)
      }
    }
    else if (loggedIn === true) {
      let endpoint = 'http://localhost:8000/api/get_user/'
      let accessToken = localStorage.getItem('access')
      if (accessToken === null || accessToken === ''){
        setLoggedIn(false)
        return
      }
      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Token ' + accessToken
        },
      }
      fetch(endpoint, options)
      .then(response=>response.json())
      .then(data=>setUserData(data))
    }
  }, [loggedIn])

  useEffect(() => {
    if (userData === null) {
      setLoggedIn(false)
    }
  }, [userData])

  const validateToken = () => {
    let endpoint = 'http://localhost:8000/api/token/verify/'
    let accessToken = localStorage.getItem('access')
    if (accessToken === null || accessToken === ''){
      setLoggedIn(false)
      return
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: accessToken})
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .then(data=>{
      if (data.code === 'token_not_valid'){
        refreshToken()
      }
      else{
        setLoggedIn(true)
        let refreshEverySeconds = 1800000
        setRefreshIntervalId(setInterval(refreshToken, refreshEverySeconds))
      }
    })
  }

  const refreshToken = () => {
    let endpoint = 'http://localhost:8000/api/token/refresh/'
    let Token = localStorage.getItem('refresh')
    if (Token === null || Token === ''){
      setLoggedIn(false)
      return
    }
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({refresh: Token})
    }
    fetch(endpoint, options)
    .then(response=>response.json())
    .catch(err=>console.log(err))
    .then(data=>{
      if (data.code === 'token_not_valid'){
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        setLoggedIn(false)
        setUserData(null)
        clearInterval(refreshIntervalId)
        setRefreshIntervalId(null)
      }
      else{
        localStorage.setItem('access', data.access)
        setLoggedIn(true)
      }
    })
  }

  return [userData, setUserData]
}

export default useValidate