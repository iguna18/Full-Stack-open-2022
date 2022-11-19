import { useDispatch } from 'react-redux'
import { createAC, sortAC } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(createAC(e.target.anecdote.value))
    dispatch(sortAC())  
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