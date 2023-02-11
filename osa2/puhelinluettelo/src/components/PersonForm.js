const PersonForm = ({handleSubmit, handleNameInput, handlePhoneInput, newName, newNumber}) => {
  return(
    <div>
      <h2>Add new name</h2>
      <form onSubmit={handleSubmit} >
        <div>
          <label>name:</label>
          <input onChange={handleNameInput} value={newName} />
        </div>
        <div>
          <label >phone:</label>
          <input onChange={handlePhoneInput} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
export default PersonForm
