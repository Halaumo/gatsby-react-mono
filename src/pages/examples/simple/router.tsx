import React from 'react'
import RandomPerson from '@/components/examples/simple/router/hooks/randomPerson'
import Nav from '@/hocs/nav'
import { Router } from '@reach/router'

const Empty: React.FC<any> = () => <div>Empty route</div>

const child = (): JSX.Element => {
  return (
    <>
      <Nav visible={false} />
      <Router>
        <Empty path='/examples/simple/router' />
        <RandomPerson path='/examples/simple/router/:results'/>
      </Router>
    </>
  )
}

export default child
