import React from 'react'
import RandomPerson from '@/components/examples/simple/router/hooks/randomPerson'
import Nav from '@/hocs/nav'
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
