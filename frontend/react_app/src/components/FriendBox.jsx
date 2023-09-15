import React from 'react'

import avatar from '../assets/default user.jpg'

const FriendBox = ({item}) => {
  return (
    <li>
      <img className='avatar' src={avatar} alt="" />
      <p>{item.username}</p>
    </li>
  )
}

export default FriendBox