import { useState, useEffect } from 'react'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import Message from './Message'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import {likeBlog, setNotification, deleteBlog,initializeBlogs} from '../reducers/thunks'

const UserPage = ({ setUser, user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  useEffect(()=>{
      dispatch(initializeBlogs())
  }, [])

  const onLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addLike = (blog) => () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`added like to ${blog.title} by ${blog.author}`))
    } catch (error) {
      dispatch(setNotification(error.message))
    } 
  }

  const removeBlog = (blog, setIsRemoved) => async () => {
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`removed ${blog.title} by ${blog.author}`))
    } catch (error) {
      dispatch(setNotification(error.message))
    } 
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // we want to sort the array for the view so we copy it due to its immutability
  let blogsCopy = [...blogs]
  return (
    <div>
      <h2>blogs</h2>
      <Message/>
      {user.name} has logged in
      <button onClick = {onLogOut}>log out</button>
      <Togglable buttonLabel='new blog'>
        <CreateNewBlog/>
      </Togglable>
      <ul>
        {
          blogsCopy
            .sort((a, b) => b.likes - a.likes)
            .map(blog => <Blog key={blog.id} blog={blog} blogStyle={blogStyle}
              addLike={addLike} removeBlog={removeBlog}
              isCreatedByCurrentUser={blog.user_id.username === user.username}/>)
        }
      </ul>
    </div>
  )
}
export default UserPage