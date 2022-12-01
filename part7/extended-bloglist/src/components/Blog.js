import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogStyle, addLike, removeBlog, isCreatedByCurrentUser }) => {
  const [visible, setVisible] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <li className='blogentry' style={isRemoved ? { display:'none' } : blogStyle}>
      <p>{blog.title} by {blog.author}</p>
      <button id='viewbutton' onClick={toggleVisible}>{visible?'hide':'view'}</button>
      {
        visible && (
          <>
            <p>{blog.url}</p>
            <p>
              {blog.likes}
              <button id='likebutton' onClick={addLike(blog)}>like</button>
            </p>
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
    </li>
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