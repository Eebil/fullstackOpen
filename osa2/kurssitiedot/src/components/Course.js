const Course = ({course}) => {

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({courseName}) => {
  return(
      <h1>{courseName}</h1>
  )
}

const Content = ({parts}) => {
  return(
    <>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
    </>
    )
  
}

const Total = ({parts}) => {
  return(
    <p><strong>Total of {parts.map(part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue, 0)} exercises</strong></p>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

export default Course