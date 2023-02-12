const PersonTable = ({persons, showFilter, handleDelete}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.filter(person => showFilter.test(person.name)).map(person => {
            return(
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><button onClick={() => handleDelete(person.id)}>Delete</button></td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}
export default PersonTable