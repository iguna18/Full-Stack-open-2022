import { useState } from 'react'
import blogService from '../services/blogs'
import MyInput from './MyInput'

const CreateNewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({title, author, url})
      
    } catch (exception) {
      alert(exception)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit = {handleCreate}>
        title <MyInput value={title} setValue={setTitle}/>
        <br/>
        author <MyInput value={author} setValue={setAuthor}/>
        <br/>
        url <MyInput value={url} setValue={setUrl}/>
        <br/>
        <button>create</button>
      </form>
    </div>
  )
}


export default CreateNewBlog