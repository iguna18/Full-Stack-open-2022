import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import UserPage from './components/UserPage'
import LoginPage from './components/LoginPage'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './reducers/userSlice'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const localStorageUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(localStorageUser))
      blogService.setToken(localStorageUser.token)
    }
  }, [])
  return user != null ? <UserPage/> : <LoginPage/>
}

export default App
