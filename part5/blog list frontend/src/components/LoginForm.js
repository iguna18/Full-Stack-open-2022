import { useState } from 'react'
import MyInput from './MyInput'

const LoginForm = ({loginFunction}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    loginFunction(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      username <MyInput value={username} setValue={setUsername}/>
      <br/>
      password <MyInput value={password} setValue={setPassword}/>
      <br/>
      <button>login</button>
    </form>
  )
}

export default LoginForm