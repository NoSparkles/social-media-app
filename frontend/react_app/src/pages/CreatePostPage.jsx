import React, { useState, useEffect } from 'react'
import useValidate from '../useValidate'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import useFetch from '../useFetch'

import defaultPostImage from '../assets/default photo.png'

const CreatePostPage = () => {
  const [userData, setUserData] = useValidate()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(undefined)
  const [imageError, setImageError] = useState('')
  const [data, response, error, fetchData] = useFetch()

  useEffect(() => {
    if (userData === 0) {
        navigate('/')
    }
  }, [userData])

  useEffect(() => {
    console.log(data)
    if (!data) {
      return
    }

    if (!response.ok && data.image) {
      console.log(response, data)
      setImageError('Image was not selected.')
      return
    }
    
    navigate('/')
    alert('Post was created.')
  }, [data])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {

      setImage(file)
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !image) {
      setImageError('Title and image are required.')
      return;
    }
    
    fetchData('/posts/', "POST", {title: title, image: image})
  }

  return (
    <>
       {
          userData && (
            <>
              <Navbar userData={userData} setUserData={setUserData}/>

              <form className='post-editor' onSubmit={handleSubmit}>
                <textarea placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title}></textarea>
                <img src={image ? URL.createObjectURL(image) : defaultPostImage} alt="photo" />
                <input type="file" onChange={handleImageChange}/>
                {
                  imageError && (<p className='error-color'>{imageError}</p>)
                }
                <button>Create</button>
              </form>

            </>
          )
        }
    </>
 
  )
}

export default CreatePostPage