import React, { useState, useEffect } from 'react'
import useValidate from '../useValidate'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'

import defaultPostImage from '../assets/default photo.png'

const CreatePostPage = () => {
  let [userData, setUserData] = useValidate()
  let navigate = useNavigate()
  useEffect(() => {
    if (userData === 0) {
        navigate('/')
    }
  }, [userData])

  return (
    <>
       {
          userData ? (
            <>
              <Navbar userData={userData} setUserData={setUserData}/>

              <div className='post-editor'>
                <textarea placeholder='Title'></textarea>
                <img src={defaultPostImage} alt="photo" />
                <input type="file" />
              </div>

            </>
          ) : (
            <>

            </>
          )
        }
    </>
 
  )
}

export default CreatePostPage