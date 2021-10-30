import React from 'react';

const Total = (props) => {
  const parts = props.parts
  return (
    <>
      <p>
        Number of exercises {parts[0]['exercises'] + parts[1]['exercises'] + parts[2]['exercises']}
      </p>
    </>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <h1>{course['name']}</h1>
      {course['parts'].map(part => 
        <p key={part['id']}>{part['name']} {part['exercises']}</p>
      )}
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 0,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 1,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 2,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <Course course={course} />
  )
}

export default App;
