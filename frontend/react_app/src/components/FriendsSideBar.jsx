import React from 'react'

import avatar from '../assets/default user.jpg'

const Friends = ({data}) => {
  return (
    <div className="friends">
      <h1>Friends: </h1>
      <ul className='friends-list'>
        <li className='friend-box'>
          <img src={avatar} alt="avatar" className='avatar'/>
        <p>Bob</p>
        </li>

        <li className='friend-box'>
          <img src={avatar} alt="avatar" className='avatar'/>
          <p>Patrick</p>
        </li>
        
        <li className='friend-box'>
          <img src={avatar} alt="avatar" className='avatar'/>
          <p>Sandy</p>
        </li>
      </ul>
    </div>
  )
}

export default Friends