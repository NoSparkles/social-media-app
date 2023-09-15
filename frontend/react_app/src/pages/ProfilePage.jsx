import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Feed from '../components/Feed'

import avatar from '../assets/default user.jpg'
import useFetch from '../useFetch'
import useValidate from '../useValidate'


const ProfilePage = () => {
  let params = useParams()
  let [userData, setUserData] = useValidate()
  let [profileData, profileResponse, profileError, fetchProfileData] = useFetch()
  let [postsData, postsResponse, postsError, fetchPostsData] = useFetch()

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
    if (profileResponse.ok){
      console.log(profileData)
    }
    
  }, [postsData, profileData])

  

  return (
    <>
      {
        postsData && profileData ? (
          <>
            <Navbar userData={userData} setUserData={setUserData}></Navbar>
            <div className='profile after-nav'>
              <img className='profile-pic' src={avatar} alt="" />
              <h1 >@{profileData.username}</h1>
              <h4>Friends: </h4>
              <ul className='profile-friends'>
                {
                  profileData.friends.map((item, i) => (
                    <li key={i}>
                      <img className='avatar' src={avatar} alt="" />
                      <p>{item.username}</p>
                    </li>
                  ))
                }
              </ul>
              <Feed data={postsData} userData={userData}></Feed>
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