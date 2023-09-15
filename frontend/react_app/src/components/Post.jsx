import React, { useEffect, useState } from 'react'

import defaultPhoto from '../assets/default photo.png'

import useFetch from '../useFetch'

const Post = ({item, userData}) => {
  let [likePostData, likePostResponse, likePostError, fetchLikePostData] = useFetch()
  let [likes, setLikes] = useState(item.likes)
  let [liked, setLiked] = useState(item.liked)

  const likePost = () => {
    fetchLikePostData(`/like_post/${item.id}/`, 'GET', null, true)
  }
  useEffect(() => {

    if(!likePostData){
      return
    }
    if(!likePostResponse.ok){
      return
    }
    setLikes((prev) => prev + 1)
    setLiked(true)
  }, [likePostData])

  return (
    <div className="post">
      <p>@{item.username}</p>
      <h3>{item.title}</h3>
      <img src={defaultPhoto} alt="photo" />
      {
        userData ? (
          <>
            <button onClick={likePost}><p>Likes: {likes}</p></button>  
            <p>{`${liked ? 'Liked' : ''}`}</p>
          </>
          
        ) : (
          <p>Likes: {item.likes}</p>
        )
      }
    </div>
  )
}

export default Post