import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ value, text }) => <tr><td>{text}</td><td>{value}</td></tr>

const Placeholder = () => <p>No feedback given</p>

const Statistics = ({ data }) => {
  let good = data[0]
  let neutral = data[1]
  let bad = data[2]

  return(
    <table>
      <tbody>
        <StatisticLine value={good} text='good' />
        <StatisticLine value={neutral} text='neutral' />
        <StatisticLine value={bad} text='bad' />
        <StatisticLine value={(good + bad + neutral)/3} text='average' />
        <StatisticLine value={good/(good + bad + neutral)*100 + '%'} text='positive' />
      </tbody>
    </table>
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
      <h1>Statistics</h1>
      {(good===0 && neutral===0 && bad===0) ? <Placeholder /> : <Statistics data={[good, neutral, bad]} />}
    </div>
  )
}

export default App