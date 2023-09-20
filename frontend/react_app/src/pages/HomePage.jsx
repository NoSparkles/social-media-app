import React from 'react'
import { useEffect, useState } from 'react'

import Feed from '../components/Feed'
import FriendsSideBar from '../components/FriendsSideBar'
import Navbar from '../components/Navbar'

import useValidate from '../useValidate'
import useFetch from '../useFetch'

const HomePage = () => {
  const [userData, setUserData] = useValidate()
  let [friends, setFriends] = useState(undefined)
  let [posts, setPosts] = useState(undefined)

  let [postsData, postsResponse, postsError, fetchPostsData] = useFetch()

  useEffect(() => {
    fetchPostsData(`/posts/`, 'GET', null, true)
  }, [])

  useEffect(() => {
    if (userData) {
      setFriends(userData.friends)
    }
    else if(!userData){
      setFriends(undefined)
    }
  }, [userData])

  useEffect(() => {
    if(postsData){
      setPosts(postsData)
    }
  }, [postsData])

  return (
    <>
      <Navbar userData={userData} setUserData={setUserData}/>
      {
        posts ? (
          <Feed posts={posts} userData={userData}/>
        ) : (
          <></>
        )
      }
      
      {
        userData && friends? (
          <FriendsSideBar friends={friends}/>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default HomePage