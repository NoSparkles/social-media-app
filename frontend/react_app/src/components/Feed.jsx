import React from 'react'

import Post from './Post'

const Feed = ({data, userData}) => {
  console.log('from feed', data)
  return (
    <div className="feed">
      {
        data ? (
          <>
            {
              data.map((item, i) => (
                <Post userData={userData} item={item} key={i}></Post>
              ))
            }
          </>
        ) : (
          <>
          </>       
        )
      }
    </div>
  )
}

export default Feed