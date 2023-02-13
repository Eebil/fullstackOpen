import { calculateNewValue } from '@testing-library/user-event/dist/utils'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import PersonTable from './components/PersonTable.js'
import Error from './components/Error'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState(new RegExp('', 'i'))
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // initial load from Json-server
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const flashNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const flashError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

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
            flashNotification(`Note: '${newName}' information updated!`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            flashError(error.message)
          })
      }
      else {
        flashNotification(`No changes made`)
      }
    }

    else {
      personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        flashNotification(`Note: ${newName} added to the phonebook`)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleDelete = (id) => {
      if (window.confirm(`are you sure you want to delete ${persons.find(person => person.id === id).name}`)) {
        personService
        .destroy(id)
        .then(response => {
          flashNotification(`Note: ${persons.find(person => person.id === id).name} Deleted`)
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
      < Notification message={notificationMessage} />
      < Error message={errorMessage} />
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