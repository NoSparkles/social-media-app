import React, {useEffect} from 'react'

import useFetch from '../useFetch'

import Post from './Post'

const Feed = ({data, userData}) => {
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