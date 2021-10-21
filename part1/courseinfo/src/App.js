import React from 'react';

const Header = (props) => {
  return (
    <>
      <h1>
        {props.course}
      </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.count}
      </p>
    </>    
  )
}

const Content = (props) => {
  console.log(props.parts)
  let obj_list = props.parts
  return(
    <>
      <Part name={obj_list[0]['name']} count={obj_list[0]['exercises']}/>
      <Part name={obj_list[1]['name']} count={obj_list[1]['exercises']}/>
      <Part name={obj_list[2]['name']} count={obj_list[2]['exercises']}/>
    </>
  )
}


const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises {props.sum}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total sum={part1['exercises'] + part2['exercises'] + part3['exercises']} />
    </div>
  )
}

export default App;
