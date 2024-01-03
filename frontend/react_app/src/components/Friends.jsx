import React from 'react'

import FriendBox from './FriendBox'

// update friends properly

const Friends = ({userData, friends, setFriends}) => {
  return (
    <>
      {
        friends ? (
          <ul className='friends-vertical'>
            {
              friends.map((item, i) => (
                <FriendBox userData={userData} key={i} item={item} setFriends={setFriends}></FriendBox>
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