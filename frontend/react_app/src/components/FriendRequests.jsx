import React, { useEffect } from 'react'
import useFetch from '../useFetch'
import FriendRequest from './FriendRequest'

const FriendRequests = ({userData, friendRequests, setFriendRequests, setFriends}) => {
  const [data, response, error, fetchData] = useFetch()
  useEffect(() => {
    fetchData(`/friend_requests/${userData.username}/`, 'GET', null)
  }, [])
  useEffect(() => {
    if (!data){
      return
    }
    if (!response.ok){
      return
    }
    setFriendRequests(data)
  }, [data])
  return (
    <ul className='friend-requests'>
      {
        friendRequests ? (
          <>
          {friendRequests.map((item, i) => (
            <FriendRequest key={i} item={item} setFriendRequests={setFriendRequests} setFriends={setFriends}></FriendRequest>
          ))}
          </>
            
        ) : (
          <></>
        )
      }
    </ul>
  )
}

export default FriendRequests