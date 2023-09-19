import React from 'react'

import FriendBox from './FriendBox'

const FriendsSideBar = ({friends}) => {
  return (
    <div className="friends">
      <h1>Friends: </h1>
      <ul className='friends-list'>
        {
          friends.map((item, i) => (
            <FriendBox key={i} item={item}/>
          ))
        }
      </ul>
    </div>
  )
}

export default FriendsSideBar