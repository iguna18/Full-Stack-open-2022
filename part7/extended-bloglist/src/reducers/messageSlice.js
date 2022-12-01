import { createSlice } from '@reduxjs/toolkit'

const initialState = { text:'', isError:false, timeoutID:null }

const messageSlice = createSlice({
  name: 'message',
  initialState:'XAXAXA',
  reducers: {
    changeMessage: (state, action) => {
      return action.payload
    }
  }
})

export const { changeMessage } = messageSlice.actions

export default messageSlice.reducer
