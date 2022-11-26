import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/messageSlice'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => {
    let anecdotes = state.anecdotes.filter(a => {
      return a.content.toLowerCase().startsWith(filter.toLowerCase())
    })
    return [...anecdotes].sort((a, b) => b.votes - a.votes)
  })

  const onVote = async (anecdoteObject) => {
    try {
      dispatch(voteAnecdote(anecdoteObject))
    } catch (error) {
      dispatch(setNotification(`ERROR: "${error}"`))
      return
    }
    dispatch(setNotification(`UPVOTED ANECTODE "${anecdoteObject.content}"`))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList