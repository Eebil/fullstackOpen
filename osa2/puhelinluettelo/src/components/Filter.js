const Filter = ({handleFilter}) => {
  return (
    <div>
      <h2>Search by name</h2>
      <input onChange={handleFilter} /> 
    </div>
  )
}
export default Filter