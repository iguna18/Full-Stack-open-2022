import loginService from '../services/login'
import blogService from '../services/blogs'
import Message from './Message'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import { setNotification } from '../reducers/thunks'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userSlice'

const LoginPage = () => {

  const dispatch = useDispatch()

  const LogIn = (username, password) => {
    loginService
      .login(username, password)
      .then(retrievedUsed => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(retrievedUsed))
        dispatch(setUser(retrievedUsed))
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
      <Message/>
      <Togglable buttonLabel='login'>
        <LoginForm loginFunction={LogIn} />
      </Togglable>
    </div>
  )
}

export default LoginPage