import React, { useEffect, useState } from 'react'

import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

import defaultPostImage from '../assets/default photo.png'

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
      <img src={item.image || defaultPostImage} alt="photo" />
      {
        userData ? (
          <div className='likes'>
            <button onClick={likePost}><p>Likes: {likes}</p></button>  
            <p >{`${liked ? 'Liked!' : ''}`}</p>
          </div>
          
        ) : (
          <div className='likes-box'>
            <p>Likes: {item.likes}</p>
          </div>
        )
      }
    </div>
  )
}

export default Post