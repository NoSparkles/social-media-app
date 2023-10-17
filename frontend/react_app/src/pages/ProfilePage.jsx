import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Feed from '../components/Feed'

import avatar from '../assets/default user.jpg'
import useFetch from '../useFetch'
import useValidate from '../useValidate'
import FriendBox from '../components/FriendBox'

const ProfilePage = () => {
  let params = useParams()
  let navigate = useNavigate()
  let [userData, setUserData] = useValidate()
  let [profileData, profileResponse, profileError, fetchProfileData] = useFetch()
  let [postsData, postsResponse, postsError, fetchPostsData] = useFetch()
  let [posts, setPosts] = useState(undefined)
  let [showMessageButton, setShowMessageButton] = useState(false)
  useEffect(() => {
    if (userData !== undefined){
      fetchProfileData(`/users/${params.id}/`)
      fetchPostsData(`/users/${params.id}/posts/`, 'GET', null)
    }
  }, [userData, params])

  useEffect(() => {
    if (!postsData){
      return
    }
    if (postsResponse.ok){
      console.log(postsData)
    }

    if (!profileData){
      return
    }
    if (!profileResponse.ok){
      return
    }

    if (profileData && userData) {
      profileData.friends.map((item, i) => {
        if (item.username === userData.username) {
          setShowMessageButton(true)
        }
      })
    }
    else {
      setShowMessageButton(false)
    }

    if (postsData){
      setPosts(postsData)
    }
  }, [postsData, profileData])

  

  return (
    <>
      {
        userData !== undefined && posts && profileData ? (
          <>
            <Navbar userData={userData} setUserData={setUserData}></Navbar>
            <div className='profile after-nav'>
              <img className='profile-pic' src={avatar} alt="" />
              <h1 >@{profileData.username}</h1>

              <h4>Friends: </h4>
              <ul className='profile-friends'>
                {
                  profileData.friends.map((item, i) => (
                    <FriendBox key={i} item={item}/>
                  ))
                }
              </ul>
              
              {
                showMessageButton ? (
                    <button onClick={() => navigate(`/chat?friend=${profileData.username}`)}>Message</button>
                ) : (
                  <></>
                )
              }
      
              <Feed posts={posts} userData={userData}></Feed>
            </div>
          </>
        ) : (
          <></>
        )
      }
      
      
    </>
  )
}

export default ProfilePage