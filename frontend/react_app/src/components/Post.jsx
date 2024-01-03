import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'

import useFetch from '../useFetch'
import { Link } from 'react-router-dom'

import defaultPostImage from '../assets/default photo.png'

const Post = ({item, userData}) => {
  let [likePostData, likePostResponse, likePostError, fetchLikePostData] = useFetch()
  let [likes, setLikes] = useState(item.likes)
  let [liked, setLiked] = useState(item.liked)

  useEffect(() => {
    if (!userData) {
      setLiked(false)
    }
  }, [userData])

  const likePost = () => {
    fetchLikePostData(`/like_unlike_post/${item.id}/`, 'GET', null)
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
          <div className='likes-box'>
            <button onClick={userData ? likePost : ()=> alert("Log in to like the post")}><FontAwesomeIcon icon={liked ? solidHeart : regularHeart} /><p>{likes}</p></button>  
          </div>
    </div>
  )
}

export default Post