import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'

import messageReducer from './reducers/messageSlice'
import blogsReducer from './reducers/blogsSlice'

import { configureStore } from '@reduxjs/toolkit'

let store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogsReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
