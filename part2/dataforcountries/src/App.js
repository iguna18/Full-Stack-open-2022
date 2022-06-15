import { useState, useEffect } from 'react' 
import axios from 'axios'


const Countries = ({filter, countries}) => {
  if(filter === '')
    return <></>
  let fcs = countries.filter(c => c.name.common.toLowerCase().startsWith(filter.toLowerCase()))

  if(fcs.length == 1) {
    let c = fcs[0]
    //console.log(c)
    let langKeys = Object.keys(c.languages)
    return <>
      <h1>{c.name.common}</h1>
      <p>capital {c.capital[0]}</p>
      <p>area {c.area}</p>
      <h3>languages</h3>
      <ul>
        {langKeys.map(key => <li key={key}>{c.languages[key]}</li>)}
      </ul>
    </>
  }
  if(fcs.length < 10)
    return <>{fcs.map(c => {
      //console.log(c.fifa)
      return <p key={c.name.common}>{c.name.common}</p>})}</>

  return <>Too many matches, specify another filter</>
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response =>{
        let d = (response.data)
        setCountries(d)
        //console.log(countries[0])
      })
  }, [])

  return (
    <>
      <div>
        find countries <input value={filter} onChange={(e)=>setFilter(e.target.value)}/>
      </div>
      <div>
        <Countries filter={filter} countries={countries}/>
      </div>
    </>)
}

export default App