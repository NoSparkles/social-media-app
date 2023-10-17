import React, { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import useValidate from '../useValidate';

const ChatPage = () => {
  const location = useLocation();
  const friendName = (new URLSearchParams(location.search).get('friend')).replace('/', '')
  const navigate = useNavigate()
  const [userData, setUserData] = useValidate()
  
  useEffect(() => {
    if (userData === 0) {
      navigate('/')
    }
  }, [userData])
  return (
    <>
      <Navbar userData={userData} setUserData={setUserData}/>
      <div id="messages">
        <div className='message message-right'>
          <h1 className='name'>robertas</h1>
          <p className='body'>Vikipedija yra universali, daugiakalbė interneto enciklopedija, kaip bendruomeninis projektas, pagal viki technologiją ir pamatinius principus kuriama daugybės savanorių bei išlaikoma iš paaukotų lėšų.</p>
        </div>
        <div className='message message-left'>
          <h1 className='name'>robertas2</h1>
          <p className='body'>Vikipedija yra universali, daugiakalbė interneto enciklopedija, kaip bendruomeninis projektas, pagal viki technologiją ir pamatinius principus kuriama daugybės savanorių bei išlaikoma iš paaukotų lėšų.</p>
        </div>
        <div className='message message-left'>
          <h1 className='name'>robertas2</h1>
          <p className='body'>Vikipedija yra universali, daugiakalbė interneto enciklopedija, kaip bendruomeninis projektas, pagal viki technologiją ir pamatinius principus kuriama daugybės savanorių bei išlaikoma iš paaukotų lėšų.</p>
        </div>
        <div className='message message-right'>
          <h1 className='name'>robertas</h1>
          <p className='body'>Vikipedija yra universali, daugiakalbė interneto enciklopedija, kaip bendruomeninis projektas, pagal viki technologiją ir pamatinius principus kuriama daugybės savanorių bei išlaikoma iš paaukotų lėšų.</p>
        </div>
        
      </div>
      <form className="messageform">
        <input id="message-body" type="text" placeholder={`Message @${friendName}`} name="message-body"/>
        <button type="submit">Send</button>
      </form>

    </>
  )
}

export default ChatPage