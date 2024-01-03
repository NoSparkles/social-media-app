import React, { useEffect, useState } from 'react'
import useValidate from '../useValidate'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Friends from '../components/Friends'
import FriendRequests from '../components/FriendRequests'
import AddFriendForm from '../components/AddFriendForm'
import useFetch from '../useFetch'

const FriendsPage = () => {
  const [userData, setUserData] = useValidate()
  const [friends, setFriends] = useState(undefined)
  const [friendRequests, setFriendRequests] = useState(undefined)
  const navigate = useNavigate()

  const [data, response, error, fetchData] = useFetch()

  useEffect(() => {
    if (!data){
      return
    }
    if (!response.ok){
      return
    }
    setFriendRequests(data)
  }, [data])

  useEffect(() => {
    if(userData === 0){
      navigate('/')
    }
    else if (userData) {
      setFriends(userData.friends)
      fetchData(`/friend_requests/${userData.username}/`, 'GET', null)
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

              <div className='friends-and-requests'>
                <div className="friends-container">
                  <h4 className='friends-label'>Friends:</h4>
                  {
                    friends?.length ? (
                      <Friends userData={userData} friends={friends} setFriends={setFriends}/>
                    ) : (
                      <></>
                    )
                  }
                </div>

                <div className="friends-container">
                  <h4 className='friend-requests-label'>Friend requests:</h4>
                  {
                    friendRequests?.length ? (
                      <FriendRequests userData={userData} friendRequests={friendRequests} setFriendRequests={setFriendRequests} setFriends={setFriends}/>
                    ) : (
                      <></>
                    )
                  }
                  
                </div>
              </div>
              
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