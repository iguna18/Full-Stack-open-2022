import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import MyInput from './MyInput'

const LoginPage = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLoginForm = (event) => {
    event.preventDefault()
    loginService
      .login(username, password)
      .then(retrievedUsed => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(retrievedUsed)) 
        setUser(retrievedUsed)
        blogService.setToken(retrievedUsed.token)
        setUsername('')
        setPassword('')
      })
      .catch(err => console.log('prablema', err))
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={submitLoginForm}>
        username <MyInput value={username} setValue={setUsername}/>
        <br/>
        password <MyInput value={password} setValue={setPassword}/>
        <br/>
        <button>login</button>
      </form>
    </div>
  )
}

export default LoginPage