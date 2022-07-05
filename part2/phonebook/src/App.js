import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Filter from './Filter'
import Message from './Message'
import personsDBservice from './services/personsDB'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {    
    personsDBservice
      .getAll()
      .then(personsReceived => {
        setPersons(personsReceived)
      })
  }, [messageText])

  return (
    <div>
      <h2>Phonebook</h2>
      <Message messageText={messageText} isError={isError}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}
                  newName={newName} setNewName={setNewName}
                  newNumber={newNumber} setNewNumber={setNewNumber}
                  messageText={messageText} setMessageText={setMessageText}
                  isError={isError} setIsError={setIsError}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons}
              messageText={messageText} setMessageText={setMessageText}
              isError={isError} setIsError={setIsError}/>
    </div>)
}

export default App