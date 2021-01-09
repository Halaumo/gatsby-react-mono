import React from 'react'
import RandomPerson from '@/components/examples/simple/router/randomPerson'
import Nav from '@/projectContainers/nav'
import { Router } from '@reach/router'

const Empty: React.FC<any> = () => <div>Empty route</div>

const App = (): JSX.Element => {
  return (
    <>
      <Nav visible={false}/>
      <Router>
        <Empty path='/app' />
        <RandomPerson path='/app/:results'/>
      </Router>
    </>
  )
}

export default App
