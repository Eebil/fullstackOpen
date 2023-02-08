import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeurtalClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      < Rating handleGood={handleGoodClick} handleNeutral={handleNeurtalClick} handleBad={handleBadClick}/>
      < Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Rating = ({handleGood, handleNeutral, handleBad}) => {
  return (
    <div>
      <h1>Give feedback</h1>
      < Button handleClick={handleGood} text='good' />
      < Button handleClick={handleNeutral} text='neutral'/>
      < Button handleClick={handleBad} text='bad'/>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick} > {text} </button>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const average = (good * 1 + bad * -1) / (good + bad + neutral)
  const positive = (good / (good + bad + neutral)) * 100 + '%' // hehe javascript is so fun ;)

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1> Statistics </h1>
        No feedback yet!
      </div>
    )
  }
  return (
    <div>
      <h1> Statistics </h1>
      <table>
        <tbody>
          < Stat text='good' value={good}/>
          < Stat text='neutral' value={neutral}/>
          < Stat text='bad' value={bad}/>
          < Stat text='average rating' value={average}/>
          < Stat text='Positive ratings' value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const Stat = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

export default App