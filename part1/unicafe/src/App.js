import { useState } from 'react'

const Button = ({text, onClick}) => 
  (<button onClick={onClick}>{text}</button>) 

const StatisticLine = ({state, text}) => (
    <tr>
      <td>{text}</td>
      <td>{state}</td>
    </tr>
  )

const Statistics = ({good, neutral, bad}) => {
  if(good===0 && neutral===0 && bad===0)
    return (<div>No feedback given</div>)
  return (
    <>
      <StatisticLine state={good} text="good"/>
      <StatisticLine state={neutral} text="neutral"/>
      <StatisticLine state={bad} text="bad"/>
      <StatisticLine state={good+neutral+bad} text="all"/>
      <StatisticLine state={Number((good-bad)/(good+neutral+bad)).toFixed(1)} text="average"/>
      <StatisticLine state={Number((good*100/(good+neutral+bad)).toFixed(2)) + " %"} text="positive"/>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (state, setState) => () => {
    setState(state + 1)
  }
  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button text= "good" onClick = {handleClick(good, setGood)}/>
        <Button text= "neutral" onClick = {handleClick(neutral, setNeutral)}/>
        <Button text= "bad" onClick = {handleClick(bad, setBad)}/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App;