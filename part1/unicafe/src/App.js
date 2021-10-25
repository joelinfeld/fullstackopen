import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ value, text }) => <div>{text} {value}</div>

const Statistics = ({ data }) => {
  let good = data[0]
  let neutral = data[1]
  let bad = data[2]

  return(
    <div>
      <h1>Statistics</h1>
      <Display value={good} text='good' />
      <Display value={neutral} text='neutral' />
      <Display value={bad} text='bad' />
      <Display value={(good + bad + neutral)/3} text='average' />
      <Display value={good/(good + bad + neutral)*100 + '%'} text='positive' />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics data={[good, neutral, bad]} />
    </div>
  )
}

export default App