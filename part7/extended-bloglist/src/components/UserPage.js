import { useEffect } from 'react'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'
import Message from './Message'
import Togglable from './Togglable'
import { useSelector, useDispatch } from 'react-redux'
import {likeBlog, setNotification, deleteBlog,initializeBlogs, initializeUsers} from '../reducers/thunks'
import { setUser } from '../reducers/userSlice'
import {
  Routes, Route, Link, useMatch, useNavigate
} from "react-router-dom"

const SingleUser = ({userToShow}) => {
  if(!userToShow)
    return (
      <div></div>
    )
  return (
    <div>
      <h3>{userToShow.name}</h3>
      <h4>added blogs</h4>
      <ul>
      {
        userToShow.blog_ids.map(b => {
          return (
            <li key = {b.id}>
              {b.title}
            </li>
          )
        })
      }
      </ul>
  </div>
  )
}

const SingleBlog = ({blogToShow, addLike}) => {
  if(!blogToShow)
    return (
      <div></div>
    )
  return (
    <div>
      <h3>{blogToShow.title}</h3>
      <a href={blogToShow.url}>{blogToShow.url}</a>
      <p>{blogToShow.likes} likes</p>
      <button onClick={addLike(blogToShow)}>like</button>
      <p>added by @{blogToShow.user_id.username}</p>
  </div>
  )
}

const UserPage = () => {
  const dispatch = useDispatch()
  
  const users = useSelector(state => state.users)
  useEffect(()=>{
    dispatch(initializeUsers())
  },[])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  useEffect(()=>{
      dispatch(initializeBlogs())
  }, [])

  const onLogOut = () => {
    dispatch(setUser(null))
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
  
  let match = useMatch('/users/:id')
  const userToShow = match ? users.find(u => u.id === match.params.id) : null
  match = useMatch('/blogs/:id')
  const blogToShow = match ? blogs.find(b => b.id === match.params.id) : null

  // we want to sort the array for the view so we copy it due to its immutability
  let blogsCopy = [...blogs]
  return (
    <div >

      <div style={{backgroundColor:'red', color:'green'}}>
        <h2 >blog app</h2>
        <Message/>
        {user.name} has logged in
        <button onClick = {onLogOut}>log out</button>        
      </div>
      <Routes>
        <Route path='/' element={ // blogs view
          <div>
            <Togglable buttonLabel='new blog' >
              <CreateNewBlog />
            </Togglable>
            <h3>Blogs</h3>
            <ul>
              {
                blogsCopy
                  .sort((a, b) => b.likes - a.likes)
                  .map(blog => {
                    return (
                      <Blog key={blog.id} 
                        blog={blog} blogStyle={blogStyle}
                        addLike={addLike} removeBlog={removeBlog}
                        isCreatedByCurrentUser={blog.user_id.username === user.username}/>
                    )
                  })
              }
            </ul>
          </div>
        } />
        <Route path='/users' element={ // users view
          <div>
            <h3>Users</h3>
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th>blogs created</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(u => {
                    return (
                      <tr key={u.id}>
                        <td>
                          <Link to={`/users/${u.id}`}>{u.name}</Link>
                        </td>
                        <td>
                          {u.blog_ids.length}
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        } />
        <Route path='/users/:id' element={
          <SingleUser userToShow={userToShow}/>
        }/>
        <Route path='/blogs/:id' element={
          <SingleBlog blogToShow={blogToShow} addLike={addLike}/>
        }/>
      </Routes>

    </div>
  )
}
export default UserPage