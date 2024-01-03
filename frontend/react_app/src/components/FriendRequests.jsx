import React, { useEffect } from 'react'
import useFetch from '../useFetch'
import FriendRequest from './FriendRequest'

const FriendRequests = ({userData, friendRequests, setFriendRequests, setFriends}) => {
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