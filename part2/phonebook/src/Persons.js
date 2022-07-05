import personsDBservice from "./services/personsDB";

const Person = ({name, number, id, persons, setPersons, onDelete}) => {

  return (
    <p>
      {name} {number} 
      <button onClick={onDelete}>delete</button> {id}
    </p>)
}

const Persons = ({persons, setPersons, filter, isError, setIsError, messageText, setMessageText}) => {
  let filtered = persons.filter(p => {
    let l = p.name.toLowerCase();
    return l.startsWith(filter.toLowerCase())
  })

  const onDelete = (id, name) => () => {
    personsDBservice
      .remove(id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(err => {
        setIsError(true)
        setMessageText(`${name} was already deleted on the server. updating the page...`)
        setTimeout(()=>setMessageText(null), 4000)
        setPersons(persons.filter(p => p.id !== id))
        console.log(err)
      })
  }

  return (
    <>
      {filtered.map((p) => <Person key={p.id} name={p.name} number={p.number} 
                                    id={p.id} persons={persons} setPersons={setPersons}
                                    onDelete={onDelete(p.id, p.name)}/>)}
    </>)
}

export default Persons