const PersonForm =  ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

    const handleSubmit = (event) => {
      event.preventDefault()
      if(newName==="" || newNumber==="") {
        alert("Fill out both fields")
        return
      }
      if (persons.filter(p => p.name === newName).length > 0) {
        alert(`${newName} is already added to phonebook`)
        return
      }
  
      const newPerson = {name:newName, number:newNumber, id:persons.length+1}
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
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