import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ city }) => {
  const [ isLoading, setLoading ] = useState(true);
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setWeather(response.data.current)
        setLoading(false)
      })
  }, [])

  if (!isLoading) {
    return(
      <>
      <h2>Weather in {city}</h2>
      <p><b>Temperature:</b> {weather.temperature} Celsius</p>
      <img src={weather.weather_icons} alt='weather'/>
      <p><b>Wind: {weather.wind_speed} mph {weather.wind_dir}</b></p>
      </>
    )
  }
  return <><p>Loading...</p></>
}

const CountryDetail = ({ country }) => (
  <>
    <h1>{country.name.common}</h1>                 
    <p>Capital: {country.capital}</p>
    <p>Area: {country.area} Sq. Miles</p>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages).map(lang =>
        <li key={lang}>{lang}</li>
      )}
    </ul>
    <img src={country.flags.png} alt='flag'/>
    <Weather city={country.capital}/>
  </>
)


const Country =  ({ country }) => {
  const [ show, setShow ] = useState(false)

  const handleClick = () => setShow(!show)

  return (
    <div>
      {show ?
        <div>
          <button onClick={handleClick}>{show ? 'Hide' : 'Show'}</button>
          <CountryDetail country={country}/> 
        </div> 
        :
        <div> 
          {country.name.common + ' '}
          <button onClick={handleClick}>{show ? 'Hide' : 'Show'}</button>
        </div> 
      }
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length === 1)  return <CountryDetail country={countries[0]} />
  else if (countries.length <= 10) return countries.map(country => 
    <Country key={country.name.common} country={country} />
  )
  else return <p>Too many matches, specify another filter</p>
}

const Search = (props) => (
  <div>
    {props.text} 
    <input 
      value={props.value}
      onChange={props.onChange}
    /> 
  </div> 
)

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const countryFilter = (country) => (
    country.name.common
    .toLowerCase()
    .includes(newSearch.toLowerCase()) 
  )

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Search text='Find countries: ' value={newSearch} onChange={handleSearchChange} />
      <Countries countries={countries.filter(countryFilter)} />
    </div>
  )
}
export default App;
