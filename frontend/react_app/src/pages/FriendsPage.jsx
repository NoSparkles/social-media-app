import React, { useEffect, useState } from 'react'
import useValidate from '../useValidate'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Friends from '../components/Friends'
import FriendRequests from '../components/FriendRequests'
import AddFriendForm from '../components/AddFriendForm'

const FriendsPage = () => {
  const [userData, setUserData] = useValidate()
  const [friends, setFriends] = useState(undefined)
  const [friendRequests, setFriendRequests] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    if(userData === 0){
      navigate('/')
    }
    else if (userData) {
      setFriends(userData.friends)
    }
  }, [userData])


  return (
    <>
      {
        userData ? (
          <>
            <Navbar userData={userData} setUserData={setUserData}></Navbar>
            <div className='after-nav'>
              <AddFriendForm/>

              <h4>Friend requests:</h4>
              <FriendRequests userData={userData} friendRequests={friendRequests} setFriendRequests={setFriendRequests} setFriends={setFriends}/>

              <h4>Friends:</h4>
              <Friends userData={userData} friends={friends} setFriends={setFriends}/>
            </div>
          </>
        ) : (
          <>
          
          </>
        )
      }
      
      
    </>
  )
}

export default FriendsPage