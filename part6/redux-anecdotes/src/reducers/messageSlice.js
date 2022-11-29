import { createSlice } from '@reduxjs/toolkit'

const initialState = { text:'', isError:false, timeoutID:null }

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    changeMessage: (state, action) => {
      clearTimeout(state.timeoutID) //timeout registered with former notification
      let { text, timeoutID, isError } = action.payload
      let newState = {
        text, timeoutID, isError
      }
      return newState
    }
  }
})

export const { changeMessage } = messageSlice.actions

export const setNotification = (text, isError) => (dispatch) => {
  let timeoutID = setTimeout(() => {
    dispatch(changeMessage({
      text: null,
      isError: false
    }))
  }, 5000)

  dispatch(changeMessage({
    text, isError, timeoutID
  })) 
}

export default messageSlice.reducer
