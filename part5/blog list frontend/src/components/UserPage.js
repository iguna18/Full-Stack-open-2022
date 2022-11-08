import { useState, useEffect } from 'react'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import Message from './Message'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const UserPage = ({ setUser, user, messageText, setMessageText,
  isError, setIsError, setMessageClearingTimeout }) => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(bl => {
        setBlogs( bl )
      })
  }, [])

  const onLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const createBlog = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      let blogsNew = [...blogs, newBlog]
      setBlogs(blogsNew)
      setMessageText(`a new blog ${title} by ${author} added`)
      setIsError(false)
    } catch (exception) {
      setMessageText(exception.message)
      setIsError(true)
    }
    setMessageClearingTimeout()
  }

  const addLike = (blog) => async () => {
    try {
      await blogService.increaseLike(blog)
      let blogsNew = [...blogs]
      let b = blogsNew.find(b => b.id === blog.id)
      b.likes = b.likes + 1
      setBlogs(blogsNew)
      setMessageText(`added like to ${blog.title} by ${blog.author}`)
      setIsError(false)
    } catch (exception) {
      setMessageText(exception.message)
      setIsError(true)
    }
    setMessageClearingTimeout()
  }

  const removeBlog = (blog, setIsRemoved) => () => {
    if (!window.confirm(`remove ${blog.title} by ${blog.author} ???`)) {
      return
    }
    blogService
      .removeOne(blog.id)
      .then(() => {
        let blogsNew = [...blogs]
        blogsNew.filter(b => b.id !== blog.id)
        setBlogs(blogsNew)
        setIsError(false)
        setMessageText(`removed ${blog.title} by ${blog.author}`)
        setIsRemoved(true)
      })
      .catch(exception => {
        setIsError(true)
        setMessageText(exception.message)
      })
    setMessageClearingTimeout()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message text={messageText} isError={isError}/>
      {user.name} has logged in
      <button onClick = {onLogOut}>log out</button>
      <Togglable buttonLabel='new blog'>
        <CreateNewBlog createBlog={createBlog}/>
      </Togglable>
      <ul>
        {
          blogs
            .sort((a, b) => a.likes - b.likes)
            .map(blog => <Blog key={blog.id} blog={blog} blogStyle={blogStyle}
              addLike={addLike} removeBlog={removeBlog}
              isCreatedByCurrentUser={blog.user_id.username === user.username}/>)
        }
      </ul>
    </div>
  )
}
export default UserPage