import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, handler }) => (
  <>
    <p>{person.name} {person.number} <button onClick={(e) => handler(e, person)}>Delete</button></p>
  </>
)

const Persons = ({ persons, handler }) => (
  persons.map(person =>
    <>
      <Person key={person.id} person={person} handler={handler}/>
    </>
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
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => alert("error"))
  }, [])


  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(nameObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  
  const removeEntry = (event, person) => {
    event.preventDefault()
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
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
    <>
      <h2>Phonebook</h2>
      <Filter text='filter shown with:' value={newSearch} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm submit={addEntry} values={[newName, newNumber]} handlers={[handleNameChange, handleNumberChange]}/>
      <h2>Numbers</h2>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))} handler={removeEntry} />
    </>
  )
}

export default App