import { addBlog, setBlogs, updateBlog } from "./blogsSlice"
import { changeMessage } from "./messageSlice"
import blogService from "../services/blogs"

export const setNotification = (text) => (dispatch) => {
    dispatch(changeMessage(text))
    setTimeout(()=>{
    dispatch(changeMessage(null))
    }, 5000)
}

export const createBlog = (title, author, url) => async (dispatch) => {
  const newBlog = await blogService.create({ title, author, url })
  console.log(newBlog);
  // newBlog returned from server has 'id' and 'likes' fields too
  dispatch(addBlog(newBlog))
}

export const likeBlog = (blog) => async (dispatch, getState) => {
  await blogService.increaseLike(blog)
  const id = blog.id
  const blogs = getState().blogs
  let theBlog = blogs.find(b => b.id == id)
  theBlog = {...theBlog}
  theBlog.likes++
  dispatch(updateBlog(theBlog))
}


export const initializeBlogs = () => async (dispatch) => {
  try {
    let blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  } catch (error) {
    dispatch(setNotification(error.message))
  }
}

export const deleteBlog = (blog) => async (dispatch, getState) => {
  await blogService.removeOne(blog.id)
  const blogs = getState().blogs
  dispatch(setBlogs(blogs.filter(b=>b.id != blog.id)))
}
