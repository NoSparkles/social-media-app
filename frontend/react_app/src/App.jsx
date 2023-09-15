import { BrowserRouter, Routes, Route } from  'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import FriendsPage from './pages/FriendsPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' Component={HomePage}></Route>
          <Route path='login/' Component={LoginPage}></Route>
          <Route path='register/' Component={RegisterPage}></Route>
          <Route path='friends/' Component={FriendsPage}></Route>
          <Route path='profile/:id/' Component={ProfilePage}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
