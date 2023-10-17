import React from 'react'

import avatar from '../assets/default user.jpg'
import { Link } from 'react-router-dom'

const FriendBox = ({item}) => {
  return (
    <li className='friend-box'>
      <img className='avatar' src={avatar} alt="" />
      <Link to={`/profile/${item.id}/`}><p>{item.username}</p></Link>
    </li>
  )
}

export default FriendBox