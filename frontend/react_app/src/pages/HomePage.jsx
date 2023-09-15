import React from 'react'
import { useEffect } from 'react'

import Feed from '../components/Feed'
import FriendsSideBar from '../components/FriendsSideBar'
import Navbar from '../components/Navbar'

import useValidate from '../useValidate'
import useFetch from '../useFetch'

const HomePage = () => {
  const [userData, setUserData] = useValidate()
  let [postsData, postsResponse, postsError, fetchPostsData] = useFetch()

  useEffect(() => {
    fetchPostsData(`/posts/`, 'GET', null, true)
  }, [])

  useEffect(() => {
    if (!postsData){
      return
    }
    if (postsResponse.ok){
      console.log(postsData)
    }
    
  }, [postsData])
  return (
    <>
      <Navbar userData={userData} setUserData={setUserData}></Navbar>

      {
        postsData ? (
          <Feed data={postsData} userData={userData}></Feed>
        ) : (
          <></>
        )
      }

      {
        userData ? (
          <FriendsSideBar data={userData.friends}></FriendsSideBar> 
        ) : (
          <FriendsSideBar></FriendsSideBar>
        )
      }
      
    </>
  )
}

export default HomePage