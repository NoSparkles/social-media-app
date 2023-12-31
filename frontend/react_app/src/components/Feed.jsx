import React, {useEffect, useState} from 'react'

import Post from './Post'

const Feed = ({posts, userData}) => {
  return (
    <div className="feed">
      {
        posts ? (
          <>
            {
              posts.map((item, i) => (
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