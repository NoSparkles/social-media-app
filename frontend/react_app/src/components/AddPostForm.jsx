import React, { useEffect, useState } from 'react'
import useFetch from '../useFetch'

const AddPostForm = () => {
  let [title, setTitle] = useState('')
  let [data, response, error, fetchData] = useFetch()

  const createPost = (e) => {
    e.preventDefault()
    if(title.length === 0){
      return
    }
    fetchData('/posts/', 'POST', {title: title}, true)
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
    console.log('post', data)
    
  }, [data])

  return (
    <form onSubmit={createPost}>
      <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <button>Create post</button>
    </form>
  )
}

export default AddPostForm