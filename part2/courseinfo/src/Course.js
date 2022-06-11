const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part)=>(<Part key={part.id} part={part}/>))}
  </>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Course = ({course, parts}) => {
    let sum = parts.reduce((partialSum, a) => partialSum+a.exercises, 0)
    return (
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total sum={sum}/>
      </div>)
}

export default Course