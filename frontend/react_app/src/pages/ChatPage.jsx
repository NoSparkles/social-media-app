import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import useValidate from '../useValidate';
import useFetch from '../useFetch';

const ChatPage = () => {
  const location = useLocation();
  const friendName = (new URLSearchParams(location.search).get('friend')).replace('/', '')
  const navigate = useNavigate()
  const [userData, setUserData] = useValidate()
  const [message, setMessage] = useState('')
  const [roomData, roomResponse, roomError, fetchRoomData] = useFetch()
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
      if (data.type === 'chat') {
        setMessages((prev) => [...prev, data.message])
        scrollDownToBottom()
      }
    }
  }, [socket])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (socket && message !== '') {
      socket.send(JSON.stringify({
      'message': message,
      'username': userData.username
    }))
    }
    setMessage('')
  }

  const scrollDownToBottom = () => {
    setTimeout(() => {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 0);
  }
  return (
    <>
      <Navbar userData={userData} setUserData={setUserData}/>
      <div id="messages" ref={messagesRef}>
        {
          messages.map((item, i) => (
            <div key={i} className={`message ${item.username == userData.username? 'message-right' : 'message-left'}`}>
              <h1 className='name'>{item.username}</h1>
              <p className='body'>{item.body}</p>
            </div>
          ))
        }
      </div>
      <form className="messageform" onSubmit={handleSubmit}>
        <input id="message-body" type="text" placeholder={`Message @${friendName}`} name="message-body" value={message}  onChange={(e) => setMessage(e.target.value)}/>
        <button type="submit">Send</button>
      </form>

    </>
  )
}

export default ChatPage