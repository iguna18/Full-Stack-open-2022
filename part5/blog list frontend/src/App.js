import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import UserPage from './components/UserPage'
import LoginPage from './components/LoginPage'

const App = () => {
  const MESSAGE_TIMEOUT_PERIOD = 3500
  const [user, setUser] = useState(null)
  const [messageText, setMessageText] = useState(null)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const messageStatesKit = {
    messageText, setMessageText,
    isError, setIsError,
    setMessageClearingTimeout: () => {
      setTimeout(() => {setMessageText(null)}, MESSAGE_TIMEOUT_PERIOD)
    }
  }

  if(user) {
    return <UserPage setUser={setUser} user={user} {...messageStatesKit}/>
  }
  return <LoginPage setUser={setUser} {...messageStatesKit}/>
}

export default App
