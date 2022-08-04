require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(p => {
    res.json(p)
  })
})
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(p => {
      if(p)
        res.json(p)
      else
        res.status(404).end()
    })
    .catch(error => next(error))
})

//FIX THIS SHIT
app.get('/info', (req, res) => {
  Person.countDocuments({}, (count) => {
    res.send(`<pre>Phonebook has info for ${ count } people\n${new Date()}</pre>`)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      console.log(result)
      if(result)
        res.status(204).end()
      else
        res.status(404).send({ error: 'cannot delete, no entry with such id' })
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name and/or number missing'
    })
  }
  Person.countDocuments({ name: body.name }, (err, count) => {
    if(count>0){
      return res.status(400).json({
        error: 'name must be unique, cannot POST'
      })
    }
  })
  const prsn = new Person({
    name:body.name,
    number:body.number,
  })
  prsn.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number, id } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number, id }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if(!updatedPerson) {
        response.status(400).send({ error: 'cannot update nonexistent entry' })
      } else {
        response.json(updatedPerson)
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) =>  {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`zealcove:  Server running on port ${PORT}`)
})