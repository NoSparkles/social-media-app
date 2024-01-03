import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserGroup, faHouseUser, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = ({userData, setUserData}) => {
  return (
    userData !== undefined ? (
      <nav>
        <div className='nav-left'>
        <Link to="/"><FontAwesomeIcon icon={faHouse}/></Link>
        </div>
        <div className='nav-right'>
        {
          userData ? (
            <>
              <Link to="/friends/"><FontAwesomeIcon icon={faUserGroup} /></Link>
            <Link to={`/profile/${userData.id}/`}><FontAwesomeIcon icon={faHouseUser} /></Link>
              <p>Logged in as @<b>{userData.username}</b></p>
              <button onClick={() => {
                setUserData(null)
              }} className='logout'><FontAwesomeIcon icon={faRightFromBracket} /></button>
            </>
            
          ) : (
            <>
              <Link to="/login/"><FontAwesomeIcon icon={faRightToBracket} /></Link>
            </>
          )
        }
        </div>
      </nav>
    ) : (
      <></>
    )
    
  )
}

export default Navbar