import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)

  const handleClick = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    if (random === selected) {
      handleClick() // recursively call this function if we happen to roll same anecdote that we are currently in
    }
    else {
      setSelected(random)
    }
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      < Button handleClick={handleClick} text='next anecdote'/>
      < Button handleClick={handleVote} text='Vote'/>
      < TopRated anecdotes={anecdotes} points={points} />
    </div>
  )
}

const TopRated = ({anecdotes, points}) => {
  let topIndex = 0
  let maxValue = 0
  for (let i = 0; i < anecdotes.length; i++) {
    if (points[i] > maxValue) {
      topIndex = i
      maxValue = points[i]
    }
  }
  return (
    <div>
      <h1>Top Anecdote</h1>
      <p>{anecdotes[topIndex]}</p>
      <p>has {points[topIndex]} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick} > {text} </button>
  )
}

export default App
