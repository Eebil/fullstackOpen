const PersonTable = ({persons, showFilter}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.filter(person => showFilter.test(person.name)).map(person => {
            return(
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}
export default PersonTable