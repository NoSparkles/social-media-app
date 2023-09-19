import React from 'react'

import {Link} from 'react-router-dom'

const Navbar = ({userData, setUserData}) => {
  return (
    userData !== undefined ? (
      <nav>
        <Link to="/">Home</Link>
        {
          userData ? (
            <>
              <Link to="/friends/">Friends</Link>
              <Link to={`/profile/${userData.id}/`}>Profile</Link>
              <p>{userData.username}</p>
              <button onClick={() => {setUserData(null)}} className='logout'>Log ut</button>
            </>
            
          ) : (
            <>
              <Link to="/login/">Log in</Link>
              <Link to="/register/">Sign in</Link>
            </>
          )
        }
        
      </nav>
    ) : (
      <></>
    )
    
  )
}

export default Navbar