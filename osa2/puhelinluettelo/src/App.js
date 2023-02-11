import { calculateNewValue } from '@testing-library/user-event/dist/utils'
import { useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import PersonTable from './components/PersonTable.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState(new RegExp('', 'i'))

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      return (
        alert(`${newName} is already added to phonebook`)
      )
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      < PersonTable persons={persons} showFilter={showFilter} />
    </div>
  )

}


export default App