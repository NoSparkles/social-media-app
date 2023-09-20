import React, { useEffect, useState } from 'react'
import useFetch from '../useFetch'

const AddPostForm = ({setPosts}) => {
  let [title, setTitle] = useState('')
  let [data, response, error, fetchData] = useFetch()
  let [image, setImage] = useState(null);

  const createPost = (e) => {
    e.preventDefault()
    if(title.length === 0){
      return
    }
    fetchData('/posts/', 'POST', {title: title, image: image}, true)
    setTitle('')
  }

  useEffect(() => {
    console.log('error', error)
    if (!data){
      return
    }
    if (!response.ok){
      return
    }
    if(data){
      setPosts((prev) => [data, ...prev])
    }
    
  }, [data])

  useEffect(() => {
    console.log(image)
  }, [image])

  return (
    <form onSubmit={createPost}>
      <div>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          id='title' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          placeholder=''
          required
        />
      </div>
      
      <br />
      <button>Create post</button>
    </form>
  )
}

export default AddPostForm