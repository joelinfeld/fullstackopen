import React, { useState } from 'react'



const App = () => {
  const [ persons, setPersons ] = useState([
    { id: 0, name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length,
      name: newName
    }
    console.log('name added', event.target)
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.id}>{person.name}</p>)}
    </div>
  )
}

export default App