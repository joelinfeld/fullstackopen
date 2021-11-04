import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => (
  <>
    <h1>{country.name.common}</h1>                 
    <p>Capital: {country.capital[0]}</p>
    <p>Area: {country.area} Sq. Miles</p>
    <h2>languages</h2>
    <ul>
      {Object.values(country.languages).map(lang =>
        <li key={lang}>{lang}</li>
      )}
    </ul>
    <img src={country.flags.png} alt='flag'/>
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
        </div> :
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
