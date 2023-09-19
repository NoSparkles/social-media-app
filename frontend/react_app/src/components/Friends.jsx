import React from 'react'

import FriendBox from './FriendBox'

// update friends properly

const Friends = ({friends}) => {
  return (
    <>
      {
        friends ? (
          <ul className='profile-friends'>
            {
              friends.map((item, i) => (
                <FriendBox key={i} item={item}></FriendBox>
              ))
            }
          </ul>
        ) : (
          <></>
        )
      }
      
    </>
  )
}

export default Friends