import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, blogStyle, addLike, removeBlog, isCreatedByCurrentUser}) => {
  const [visible, setVisible] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div style={isRemoved ? {display:'none'} : blogStyle}>
      <p>
        {blog.title}
        <button onClick={toggleVisible}>{visible?'hide':'view'}</button>
      </p>
      {
        visible && (
          <>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button onClick={addLike(blog)}>like</button>
          </p>
          <p>{blog.author}</p>
          {
            isCreatedByCurrentUser && (
              <p>
                <button onClick={removeBlog(blog, setIsRemoved)}>remove</button>
              </p>
            )
          }
          </>
        )
      }
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogStyle: PropTypes.object,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  isCreatedByCurrentUser: PropTypes.bool.isRequired
}

export default Blog