import React, { useEffect, useState } from 'react'
import avatar from '../assets/default user.jpg'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../useFetch'

const FriendBox = ({userData, item, setFriends}) => {
  let navigate = useNavigate()
  let [data, response,  error, fetchData] = useFetch()

  const handleUnfriend = () => {
    fetchData(`/remove_friend/${item.id}/`, 'GET', null)
  }

  useEffect(() => {
    if (!data) {
      return
    }
    if (!response.ok) {
      return
    }
    setFriends((prev) => prev.filter((obj) => obj.id !== item.id))
  }, [data])

  return (
    <li className='friend-box'>
      <div className='friend-box-image'>
        <img className='avatar' src={avatar} alt="" />
        <Link to={`/profile/${item.id}/`}><p>{item.username}</p></Link>
      </div>
      
      {
        userData?.friends?.includes(item) ? (
          <div className='friend-box-buttons'>
            <button className='message-link' onClick={() => navigate(`/chat?friend=${item.username}`)}>Chat with a friend</button>
            <button className="remove-friend" onClick={handleUnfriend}>Unfriend</button>
          </div>
        ) : (
          <></>
        )
      }
      
    </li>
  )
}

export default FriendBox