import anecdotesReducer from './reducers/anecdoteSlice'
import messageReducer from './reducers/messageSlice'
import filterSlice from './reducers/filterSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    message: messageReducer,
    filter: filterSlice
  }
})