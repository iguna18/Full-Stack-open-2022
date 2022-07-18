const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res)=>{
    res.send(persons)
})

app.get('/api/persons/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const p = persons.find(p => p.id === id)
    if (p) {
        res.json(p)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res)=>{
    res.send('<h1>Hello deda!</h1>')
    // res.send(`<pre>Phonebook has info for ${persons.length} people\n${new Date()}</pre>`)
})

app.delete('/api/persons/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res)=>{
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'name and/or number missing' 
        })
    }
    if(persons.some(p => p.name === body.name)){
        return res.status(400).json({ 
            error: 'name must be unique' 
        })
    }
    const p = {
        id:Math.floor(Math.random()*10000),
        name:body.name,
        number:body.number
    }
    persons = persons.concat(p)
    res.json(p)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`zealcove:  Server running on port ${PORT}`)
})