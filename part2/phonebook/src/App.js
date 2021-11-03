import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({ persons }) => (
  persons.map(person => 
    <Person key={person.id} person={person} />
  )
)

const PersonForm = (props) => (
  <form onSubmit={props.submit}>
    <div>
      name: <input 
              value={props.values[0]}
              onChange={props.handlers[0]}
            />
    </div>
    <div>
      number: <input 
              value={props.values[1]}
              onChange={props.handlers[1]}
            />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Filter = (props) => (
  <div>
    {props.text}
    <input 
      value={props.value}
      onChange={props.onChange}
    />
  </div>
)

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length,
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      console.log('name added', event.target)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with:' value={newSearch} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm submit={addEntry} values={[newName, newNumber]} handlers={[handleNameChange, handleNumberChange]}/>
      <h2>Numbers</h2>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))} />
    </div>
  )
}

export default App