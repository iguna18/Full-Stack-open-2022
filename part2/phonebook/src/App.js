import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response =>{
            setPersons(response.data)
          })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}
                  newName={newName} setNewName={setNewName}
                  newNumber={newNumber} setNewNumber={setNewNumber}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>)
}

export default App