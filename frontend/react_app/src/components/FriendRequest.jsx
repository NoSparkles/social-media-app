import React, {useEffect} from 'react'


import useFetch from '../useFetch'

const FriendRequest = ({item, setFriends, setFriendRequests}) => {
  const [data, response, error, fetchData] = useFetch()
  const accept_request = () => {
    fetchData(`/accept_friend_request/${item.id}/`, "GET", null, true)
  }
  const decline_request = () => {
    fetchData(`/decline_friend_request/${item.id}/`, "GET", null, true)
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
      setFriends((prev) => [...prev, {id: item.from_user, username: item.from_user_username}])
      return
    }
    if (data.message === 'friend request declined.'){
      setFriendRequests((prev) => prev.filter((obj) => obj.id !== item.id))
      return
    }
    
  }, [data])

  return (
    <li>
      <p>{item.from_user_username}</p>
      <button onClick={accept_request}>Accept</button>
      <button onClick={decline_request}>Decline</button>
    </li>
  )
}

export default FriendRequest