import loginService from '../services/login'
import blogService from '../services/blogs'
import Message from './Message'
import LoginForm from './LoginForm'
import Togglable from './Togglable'

const LoginPage = ({ setUser, messageText, setMessageText, isError,
  setIsError, setMessageClearingTimeout }) => {

  const LogIn = (username, password) => {
    loginService
      .login(username, password)
      .then(retrievedUsed => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(retrievedUsed))
        setUser(retrievedUsed)
        blogService.setToken(retrievedUsed.token)
      })
      .catch(exception => {
        setIsError(true)
        setMessageText(exception.message)
      })
    setMessageClearingTimeout()
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