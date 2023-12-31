import React, { useState, useEffect } from 'react'
import useFetch from '../useFetch'

const ChatMessage = ({userData, item, socket, messages}) => {
  let [editing, setEditing] = useState(false)
  let [body, setBody] = useState(item.body)
  let [data, response,  error, fetchData] = useFetch()

  useEffect(() => {
    setBody(item.body)
  }, [item.body])

  useEffect(() => {
    if(!data && !response){
      return
    }
    
    if (socket && body !== '' && response.status !== 204) {
      socket.send(JSON.stringify({
      'message': body,
      'id' : item.id,
      'username': userData.username,
      'action': "update",
      }))
    }
    else if (socket && response.status === 204) {
      socket.send(JSON.stringify({
      'message': body,
      'id' : item.id,
      'username': userData.username,
      'action': "delete",
      }))
    }
    setEditing(false)
  }, [data, response])
  
  let saveMessage = (e) => {
    if (body === '') {
      return
    }
    fetchData(`/messages/${item.id}/`, "PUT", {body: body})
  }

  const handleDelete = () => {
    fetchData(`/messages/${item.id}/`, "DELETE")
  }

  return (
    <div className={`message ${item.username == userData.username? 'message-right' : 'message-left'}`}>
      <div className='message-header'>
        <h1 className='name'>{item.username}</h1>
        {
          item.username == userData.username ? 
          <>
            <button onClick={() => setEditing(true)} className='edit-button'>edit</button>
            <button onClick={handleDelete} className='delete-button'>delete</button>
          </> : 
          <>
          </>
        }
      </div>
      {
        editing ? (
          <>
            <textarea className='message-body' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <button onClick={saveMessage}>save</button>
          </>
        ) : (
          <p className='message-body'>{body}</p>
        )
      }
    </div>
  )
}

export default ChatMessage