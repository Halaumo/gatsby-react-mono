import React from 'react'

interface p {
  name: string
  age: number
}

const id: React.FC<p> = ({ children, ...props }): JSX.Element => {
  const { name, age } = props
  return (
    <>
      <h1>{name}</h1>
      <h1>{age}</h1>
      <div>{children}</div>
    </>
  )
}

export default id
