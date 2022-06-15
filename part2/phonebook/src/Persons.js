const Person = ({name, number}) => <p>{name} {number}</p>

const Persons = ({persons, filter}) => {
  let filtered = persons.filter(p => p.name.toLowerCase().startsWith(filter))
  return (
    <>
      {filtered.map((p) => <Person key={p.id} name={p.name} number={p.number}/>)}
    </>)
}

export default Persons