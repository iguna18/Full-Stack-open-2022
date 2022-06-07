
const Part = (props) => (
  <p>
    {props.partname} {props.exercisesnum}
  </p>                          
)

const Header = (props) =>  (
  <h1>{props.course}</h1>
)

const Content = (props) =>  {
  return (
    <>
      <Part partname={props.parts[0].name} exercisesnum = {props.parts[0].exercises}/>
      <Part partname={props.parts[1].name} exercisesnum = {props.parts[1].exercises}/>
      <Part partname={props.parts[2].name} exercisesnum = {props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) =>  {
  let i = 0
  props.parts.forEach(part => {i += part.exercises})
  return (
    <p>
      Number of exercises {i}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App;