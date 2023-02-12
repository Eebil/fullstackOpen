import { calculateNewValue } from '@testing-library/user-event/dist/utils'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import PersonTable from './components/PersonTable.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState(new RegExp('', 'i'))

  // initial load from Json-server
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, do you wish to update their information?`)){
        personService
        .update(persons.find(person => person.name === newName).id, newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== persons.find(person => person.name === newName).id ? person : response.data))
          setNewName('')
          setNewNumber('') // DRY refactor later
        })
        return (
          alert(`${newName} updated!`)
        )
      }
      else {
        return (
          alert(`${newName} remains unchanged`)
        )
      }
    }

    personService
    .create(newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDelete = (id) => {
      if (window.confirm(`are you sure you want to delete ${persons.find(person => person.id === id).name}`)) {
        personService
        .destroy(id)
        .then(response => {
          console.log(response.data)
          setPersons(persons.filter(person => person.id !== id))
        })
      }
      
  }
  
  const handleFilter = (event) => setShowFilter(new RegExp(event.target.value, 'i'))
  const handleNameInput = (event) => setNewName(event.target.value)
  const handlePhoneInput = (event) => setNewNumber(event.target.value)


  return (
    <div>
      <h1>Phonebook</h1>
      < Filter      handleFilter={handleFilter} />
      < PersonForm  handleSubmit={handleSubmit}
                    handleNameInput={handleNameInput}
                    handlePhoneInput={handlePhoneInput}
                    newName={newName}
                    newNumber={newNumber} />
      < PersonTable persons={persons}
                    showFilter={showFilter}
                    handleDelete={handleDelete} />
    </div>
  )

}


export default App