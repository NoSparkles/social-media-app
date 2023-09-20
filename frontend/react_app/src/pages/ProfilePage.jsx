import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Feed from '../components/Feed'

import avatar from '../assets/default user.jpg'
import useFetch from '../useFetch'
import useValidate from '../useValidate'
import FriendBox from '../components/FriendBox'
import AddPostForm from '../components/AddPostForm'


const ProfilePage = () => {
  let params = useParams()
  let [userData, setUserData] = useValidate()
  let [profileData, profileResponse, profileError, fetchProfileData] = useFetch()
  let [postsData, postsResponse, postsError, fetchPostsData] = useFetch()
  let [posts, setPosts] = useState(undefined)

  useEffect(() => {
    fetchProfileData(`/users/${params.id}/`)
    fetchPostsData(`/users/${params.id}/posts/`, 'GET', null, true)
  }, [])

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
                userData && userData.username === profileData.username ? (
                  <AddPostForm setPosts={setPosts}/>
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