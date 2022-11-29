import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../service/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      // thanks to immer we can use 'mutating syntax'
      let objToChange = state.find(o => o.id === action.payload.id)
      objToChange.votes++
    },
    createAnecdote: (state, action) => {
      const { content, id, votes } = action.payload
      return state.concat({ content, id, votes })
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
} 

export const addNewAnecdote = (anecdoteText) => async (dispatch) => {
  const {content, votes, id} = await anecdoteService.addAnecdote({
    content: anecdoteText,
    votes:0
  })
  dispatch(createAnecdote({content, votes, id}))
}

export const addVote = (anecdoteObject) => async (dispatch) => {
  let modifiedAnecdote = {...anecdoteObject, votes: anecdoteObject.votes + 1}
  await anecdoteService.updateAnecdote(modifiedAnecdote)
  dispatch(voteAnecdote({ id:modifiedAnecdote.id }))
}

export default anecdoteSlice.reducer