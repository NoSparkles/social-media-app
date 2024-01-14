import { BrowserRouter, Routes, Route } from  'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import FriendsPage from './pages/FriendsPage'
import NotFoundPage from './pages/NotFoundPage'
import ChatPage from './pages/ChatPage'
import CreatePostPage from './pages/CreatePostPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='login/' Component={LoginPage}/>
          <Route path='register/' Component={RegisterPage}/>
          <Route path='friends/' Component={FriendsPage}/>
          <Route path='profile/:id/' Component={ProfilePage}/>
          <Route path='create-post/' Component={CreatePostPage}/>
          <Route path='chat/' Component={ChatPage}/>
          <Route path='*' Component={NotFoundPage}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
