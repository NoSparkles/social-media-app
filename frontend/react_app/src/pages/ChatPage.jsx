import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import useValidate from '../useValidate';
import useFetch from '../useFetch';
import ChatMessage from '../components/ChatMessage';

const ChatPage = () => {
  const location = useLocation()
  const friendName = (new URLSearchParams(location.search).get('friend')).replace('/', '')
  const navigate = useNavigate()
  const [userData, setUserData] = useValidate()
  const [message, setMessage] = useState('')
  const [roomData, roomResponse, roomError, fetchRoomData] = useFetch()
  const [messageData, messageResponse, messageError, fetchMessageData] = useFetch()
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(undefined)
  const messagesRef = useRef()
  
  useEffect(() => {
    if (userData === 0) {
      navigate('/')
    }
    else if(userData) {
      fetchRoomData('/rooms/', 'POST', {friend: friendName})
    }
  }, [userData])

  useEffect(() => {
    if (!roomData) {
      return
    }
    if (roomData.error) {
      navigate('/')
    }
    setMessages(roomData.messages)

    scrollDownToBottom()

    setSocket(new WebSocket(`ws://localhost:8000/ws/chat/?room=${roomData.id}`))
  }, [roomData])

  useEffect(() => {
    if(!socket) {
      return
    }

    socket.onmessage = (e) => {
      let data = JSON.parse(e.data)
      if (data.type === 'create') {
        setMessages((prev) => [...prev, data.message])
        scrollDownToBottom()
      }
      else if (data.type === 'update') {
        updateMessageBody(data.message.id, data.message.body)
      }
      else if (data.type === 'delete') {
        deleteMessage(data.message)
      }
    }
  }, [socket])

  useEffect(() => {
    if (!messageData) {
      return
    }

    if (socket && message !== '') {
      socket.send(JSON.stringify({
      'message': message,
      'username': userData.username,
      'action': 'create'
      }))
    }
    setMessage('')
  }, [messageData])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMessageData('/messages/', "POST", {room: roomData.id, body: message})
  }

  const scrollDownToBottom = () => {
    setTimeout(() => {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }, 0)
  }

  const updateMessageBody = (id, newBody) => {
    if (messages[0].id > id || id > messages[messages.length - 1].id) {
      return
    }messages
  
    setMessages(prevMessages => {

      let messagesCopy = [...prevMessages]
  
      let left = 0
      let right = messagesCopy.length - 1
  
      while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        let currentId = messagesCopy[mid].id
  
        if (id === currentId) {
          const updatedMessage = { ...messagesCopy[mid], body: newBody }
          messagesCopy[mid] = updatedMessage
          return messagesCopy
        } else if (id > currentId) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
  
      return messagesCopy
    })
  }

  const deleteMessage = id => {
  
    setMessages(prevMessages => {
      let messagesCopy = [...prevMessages]
  
      let left = 0
      let right = messagesCopy.length - 1

      while (left <= right) {
        let mid = Math.floor((left + right) / 2)
        let currentId = messagesCopy[mid].id
        if (id === currentId) {
          
          messagesCopy.splice(mid, 1)
          return messagesCopy
        } else if (id > currentId) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
  
      return messagesCopy
    })
  }

  return (
    <>
      <Navbar userData={userData} setUserData={setUserData}/>
      {
        userData ? 
          <>
            <div id="messages" ref={messagesRef}>
              {
                messages.map((item, i) => (
                  <ChatMessage messages={messages} userData={userData} item={item} key={i} socket={socket}/>
                ))
              }
            </div>
            <form className="messageform" onSubmit={handleSubmit}>
              <input id="message-body" type="text" placeholder={`Message @${friendName}`} name="message-body" value={message}  onChange={(e) => setMessage(e.target.value)}/>
              <button type="submit">Send</button>
            </form>
          </> :
          <>
            
          </>
      }

    </>
  )
}

export default ChatPage