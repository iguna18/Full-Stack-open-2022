import personsDBservice from './services/personsDB'

const updateNumber = (i, persons, setPersons, newNumber, setIsError, setMessageText) => {
  let thisPerson = persons.find(p => p.id === i);
  personsDBservice
    .update(thisPerson.id, {...thisPerson, number:newNumber})
    .then(newDataReceived => {
      setPersons(
        persons.map((p) => {
          if(p.id === newDataReceived.id) {
            return {...p, number:newDataReceived.number}
          }
          return p
        })
      )
      setIsError(false)
      setMessageText(`Updated ${newDataReceived.name} with new number`)
      setTimeout(() => setMessageText(null), 4000)
    })
    .catch (error => {
      setIsError(true)
      setMessageText(`${thisPerson.name} has already been removed from the server.`)
      console.log('printed bla');
      setTimeout(() => setMessageText(null), 4000)
      setPersons(persons.filter(p => p.id !== thisPerson.id))
    })
}

const PersonForm =  ({persons, setPersons, newName, setNewName, newNumber, setNewNumber,
  setIsError, setMessageText}) => {
    
    const handleSubmit = (event) => {
      event.preventDefault()
      //Checking the fields are not empty
      if(newName==='' || newNumber==='') {
        setIsError(true)
        setMessageText('Fill out both fields')
        return
      }
      let p = persons.find((p) => p.name === newName)
      // If person already exists update the number
      if(p) {
        updateNumber(p.id, persons, setPersons, newNumber, setIsError, setMessageText)
        return
      }
      // If person doesn't exist create him
      const newPerson = {
        name:newName, 
        number:newNumber,
        id:persons.reduce((prev, cur)=>{
          return Math.max(prev.id, cur.id)
        })
      }
      personsDBservice
        .createPerson(newPerson)
        .then(newPersonReceived => {
          setPersons(persons.concat(newPersonReceived))
          setIsError(false)
          setMessageText(`Added ${newPersonReceived.name}`)
          setTimeout(()=>setMessageText(null), 4000)
          setNewName("")
          setNewNumber("")
        })
        .catch(err=>{
          setIsError(true)
          setMessageText('Ooops, we weren\'t up-to-date with the server, making adding new number '
          +'impossible because of id conflict. submit again')
          setTimeout(()=>setMessageText(null), 8000)
        })
    }
     
    const handleNameChange = (event) =>
      setNewName(event.target.value)
  
    const handleNumberChange = (event) =>
      setNewNumber(event.target.value)
  
    return (
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>)
  }

  export default PersonForm