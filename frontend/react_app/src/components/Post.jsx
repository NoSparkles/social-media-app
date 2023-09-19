import React, { useEffect, useState } from 'react'

import defaultPhoto from '../assets/default photo.png'

import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

const Post = ({item, userData}) => {
  let [likePostData, likePostResponse, likePostError, fetchLikePostData] = useFetch()
  let [likes, setLikes] = useState(item.likes)
  let [liked, setLiked] = useState(item.liked)

  const likePost = () => {
    fetchLikePostData(`/like_unlike_post/${item.id}/`, 'GET', null, true)
  }
  useEffect(() => {

    if(!likePostData){
      return
    }
    if(!likePostResponse.ok){
      return
    }
    if(likePostData.message === 'post liked successfully.'){
      setLikes((prev) => prev + 1)
      setLiked(true)
      return
    }
    if(likePostData.message === 'post unliked successfully.'){
      setLikes((prev) => prev - 1)
      setLiked(false)
      return
    }
    
  }, [likePostData])

  return (
    <div className="post">
      <Link to={`/profile/${item.user}`}><p>@{item.username}</p></Link>
      <h3>{item.title}</h3>
      <img src={defaultPhoto} alt="photo" />
      {
        userData ? (
          <>
            <button onClick={likePost}><p>Likes: {likes}</p></button>  
            <p >{`${liked ? 'Liked!' : ''}`}</p>
          </>
          
        ) : (
          <p>Likes: {item.likes}</p>
        )
      }
    </div>
  )
}

export default Post