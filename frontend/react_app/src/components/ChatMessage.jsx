import React, { useState, useEffect } from 'react'
import useFetch from '../useFetch'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

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
        {
          item.username == userData.username ? 
          <>
            <div>
              {
                editing ? (
                  <>
                    <button className='save-button' onClick={saveMessage}><FontAwesomeIcon icon={faFloppyDisk} /></button>
                  </>
                ) : (
                  <></>
                )
              }
               <button onClick={() => setEditing(true)} className='edit-button'><FontAwesomeIcon icon={faPenToSquare} /></button>
              <button onClick={handleDelete} className='delete-button'><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </> : 
          <>
          </>
        }
        <h1 className='name'>{item.username}</h1>
      </div>
      {
        editing ? (
          <>
            <textarea className='message-body' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          </>
        ) : (
          <p className='message-body'>{body}</p>
        )
      }
    </div>
  )
}

export default ChatMessage