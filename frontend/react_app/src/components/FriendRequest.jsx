import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import useFetch from '../useFetch'

import avatar from '../assets/default user.jpg'

const FriendRequest = ({item, setFriends, setFriendRequests}) => {
  const [data, response, error, fetchData] = useFetch()
  const accept_request = () => {
    fetchData(`/accept_friend_request/${item.id}/`, "GET", null)
  }
  const decline_request = () => {
    fetchData(`/decline_friend_request/${item.id}/`, "GET", null)
  }

  useEffect(() => {
    if(!data){
      return
    }
    if(!response.ok){
      return
    }
    if (data.message === 'friend request accepted.'){
      setFriendRequests((prev) => prev.filter((obj) => obj.id !== item.id))
      return
    }
    if (data.message === 'friend request declined.'){
      setFriendRequests((prev) => prev.filter((obj) => obj.id !== item.id))
      return
    }
    
  }, [data])
  return (
    <li>
      <div className='friend-box-image'>
        <img className='avatar' src={avatar} alt="" />
        <Link to={`/profile/${item.from_user}/`}><p>{item.from_user_username}</p></Link>
      </div>
      <div className='friend-box-buttons'>
        <button className='accept-friend' onClick={accept_request}>Accept</button>
        <button className='decline-friend' onClick={decline_request}>Decline</button>
      </div>
      
    </li>
  )
}

export default FriendRequest