import React, { useEffect, useState } from 'react'
import useValidate from '../useValidate'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Friends from '../components/Friends'
import FriendRequests from '../components/FriendRequests'

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
      console.log('userData')
      setFriends(userData.friends)
    }
  }, [userData])

  useEffect(() => {
    console.log('from page', userData, friends)
  }, [userData, friends])

  return (
    <>
      {
        userData && friends  ? (
          <>
            <Navbar userData={userData} setUserData={setUserData}></Navbar>
            <div className='after-nav'>
              <form action="">
                <input type="text" placeholder="Friend's username"/>
                <button>Add Friend</button>
              </form>
              <h4>Friend requests:</h4>
              <FriendRequests userData={userData} friendRequests={friendRequests} setFriendRequests={setFriendRequests} setFriends={setFriends}></FriendRequests>
              <h4>Friends:</h4>
              <Friends friends={friends}></Friends>
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