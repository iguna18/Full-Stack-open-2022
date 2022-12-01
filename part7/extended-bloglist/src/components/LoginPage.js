import loginService from '../services/login'
import blogService from '../services/blogs'
import Message from './Message'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import {changeMessage} from '../reducers/messageSlice'
import { setNotification } from '../reducers/thunks'
import { useDispatch } from 'react-redux'
const LoginPage = ({ setUser, 
  messageText, setMessageText, isError,
  setIsError, setMessageClearingTimeout }) => {

  const dispatch = useDispatch()

  const LogIn = (username, password) => {
    loginService
      .login(username, password)
      .then(retrievedUsed => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(retrievedUsed))
        setUser(retrievedUsed)
        blogService.setToken(retrievedUsed.token)
        dispatch(setNotification('fucking logged in'))
      })
      .catch(exception => {
        dispatch(setNotification(exception.message))
      })
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Message text={messageText} isError={isError}/>
      <Togglable buttonLabel='login'>
        <LoginForm loginFunction={LogIn} />
      </Togglable>
    </div>
  )
}

export default LoginPage