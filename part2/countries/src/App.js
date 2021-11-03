import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return (
      <>
        <h1>{countries[0].name.common}</h1>                 
        <p>Capital: {countries[0].capital[0]}</p>
        <p>Area: {countries[0].area} Sq. Miles</p>
        <h2>languages</h2>
        <ul>
          {Object.values(countries[0].languages).map(lang =>
            <li key={lang}>{lang}</li>
          )}
        </ul>
        <img src={countries[0].flags.png} alt='flag'/>
      </>
    )
  } else if (countries.length <= 10) return countries.map(country => <p key={country.name.common}>{country.name.common}</p>)
  else return <p>Too many matches, specify another filter</p>
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  
  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

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
      <div>
        find countries: <input 
                value={newSearch}
                onChange={handleSearchChange}
              /> 
      </div>
      <Countries countries={countries.filter(country => 
        country.name.common
          .toLowerCase()
          .includes(newSearch.toLowerCase()) 
        )} 
      />
    </div>
  )
}
export default App;
