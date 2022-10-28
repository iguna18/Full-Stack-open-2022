import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import UserPage from './components/UserPage'
import LoginPage from './components/LoginPage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if(user) {
    return <UserPage blogs={blogs} setUser={setUser} user={user}/>
  }
  return <LoginPage setUser={setUser}/>
}

export default App
