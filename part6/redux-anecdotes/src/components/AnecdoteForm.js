import { connect } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteSlice'
import { setNotification } from '../reducers/messageSlice'

const AnecdoteForm = (props) => {
  
  const submitForm = async (e) => {
    e.preventDefault()
    let anecdoteText = e.target.anecdote.value
    
    try {
      props.addNewAnecdote(anecdoteText)
    } catch (error) {
      props.setNotification(`ERROR: "${error}"`)
      return
    }
    props.setNotification(`ANECDOTE "${anecdoteText}" WAS SUCCESSFULLY CREATED`)
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

const mapDispatchToProps = { addNewAnecdote, setNotification }
export default connect(null, mapDispatchToProps)(AnecdoteForm)