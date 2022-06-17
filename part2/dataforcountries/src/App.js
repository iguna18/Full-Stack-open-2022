import { useState, useEffect } from 'react' 
import axios from 'axios'

const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState({temperature:0, wind:0, iconID:''})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
      .then(response => response.data)
      .then(weatherData => {
        setWeather({temperature:weatherData.main.temp, wind:weatherData.wind.speed, iconID:weatherData.weather[0].icon})
      })
  }, [])
  let imgsrc = "http://openweathermap.org/img/wn/"+ weather.iconID +"@2x.png"
  let langKeys = Object.keys(country.languages)
  return <>
    <h1>{country.name.common}</h1>
    <p>capital {(country.capital || ['_undefined_'])[0]}</p>
    <p>area {country.area}</p>
    <h3>languages</h3>
    <ul>
      {langKeys.map(key => <li key={key}>{country.languages[key]}</li>)}
    </ul>
    <img src={country.flags.svg} height="140"></img>
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.temperature} Celsius</p>
      <img src={imgsrc}/>
      <p>wind {weather.wind} m/s</p>
    </div>
  </>
}

const Countries = ({filter, setFilter, countries}) => {
  if(filter === '')
    return <></>
  let fcs = countries.filter(c => c.name.common.toLowerCase().startsWith(filter.toLowerCase()))

  if(fcs.length == 1)
    return <CountryInfo country={fcs[0]}/>

  if(fcs.length < 10)
    return (
      <>
        {fcs.map(c => <p key={c.name.common}>
                        {c.name.common} 
                        <button onClick={()=>setFilter(c.name.common)}>show</button>
                      </p>)}
      </>)

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
      })
  }, [])

  return (
    <>
      <div>
        find countries <input value={filter} onChange={(e)=>setFilter(e.target.value)}/>
      </div>
      <div>
        <Countries filter={filter} setFilter={setFilter} countries={countries}/>
      </div>
    </>)
}

export default App