import React, {useEffect, useState} from 'react'

import Post from './Post'

const Feed = ({posts, userData}) => {
  return (
    <ul className="feed">
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
    </ul>
  )
}

export default Feed