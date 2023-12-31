import React, {useState, useEffect} from 'react'
import useFetch from '../useFetch'

const AddFriendForm = () => {
  const [username, setUsername] = useState('')
  const [addFriendMessage, setAddFriendMessage] = useState(undefined)
  const [data, response, error, fetchData] = useFetch()
  useEffect(() => {
    if(!data){
      return
    }
    setAddFriendMessage(data.message)
  }, [data])

  const addFriend = (e) => {
    e.preventDefault()
    if(username.length === 0){
      return
    }
    fetchData(`/send_friend_request/${username}/`, 'GET', null)
    setUsername('')
  }
  return (
    <>
      <form onSubmit={addFriend}>
        <input type="text" placeholder="Friend's username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <button>Add Friend</button>
      </form>
      {
        addFriendMessage ? (
          <p className='message'>{addFriendMessage}</p>
        ) : (
          <></>
        )
      }
    </>
  )
}

export default AddFriendForm