import { useState } from 'react'
import MyInput from './MyInput'

const CreateNewBlog = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
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