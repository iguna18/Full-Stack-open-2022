import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'

const UserPage = ({blogs, setUser, user}) => {
  
  const onLogOut = () => {
    setUser(null) 
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name} has logged in
      <button onClick = {onLogOut}>log out</button> 
      <CreateNewBlog/>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
} 
export default UserPage