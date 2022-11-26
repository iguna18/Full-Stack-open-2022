import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/messageSlice'

const AnecdoteForm = () => {

  const dispatch = useDispatch()
  
  const submitForm = async (e) => {
    e.preventDefault()
    let anecdoteText = e.target.anecdote.value
    
    try {
      dispatch(addNewAnecdote(anecdoteText))
    } catch (error) {
      dispatch(setNotification(`ERROR: "${error}"`))
      return
    }
    dispatch(setNotification(`ANECDOTE "${anecdoteText}" WAS SUCCESSFULLY CREATED`))
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitForm}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm