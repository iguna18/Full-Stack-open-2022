import React from 'react'
import ReactDOM from 'react-dom/client'

import axios from 'axios'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

const promise = axios.get('http://localhost:3001/notes')
//console.log(promise)
promise.then(response => {
    console.log(response)
})

// const promise2 = axios.get('http://localhost:3001/foobar')
// promise2.then(response => {
//     console.log(response)
// })