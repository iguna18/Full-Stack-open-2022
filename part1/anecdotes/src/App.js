import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomInteger = (min, max) => (Math.floor(Math.random() * (max - min +1)) + min) //inclusive of min and max
  
  const onClickNext = () => {
    let rand = randomInteger(0, anecdotes.length - 1)
    setSelected(rand)
  }

  const onClickVote = () => {
    let votesCopy = [...votes]
    votesCopy[selected] = votesCopy[selected] + 1
    setVotes(votesCopy)
  }

  const getMaxIndex = () => {
    var index = 0;
    var value = votes[0];
    for (var i = 1; i < votes.length; i++) {
      if (votes[i] > value) {
        value = votes[i];
        index = i;
      }
    }
    return index;
  }

  return ( 
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <section>{anecdotes[selected]}</section>
        <section>number of votes:{votes[selected]}</section>
        <button onClick={onClickNext}>next anecdote</button>
        <button onClick={onClickVote}> vote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        <section>{anecdotes[getMaxIndex()]}</section>
      </div>
    </div>
  )
}

export default App