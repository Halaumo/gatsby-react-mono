import React from 'react'
import Console from '@/components/examples/StyledComponents/console/index'
import Nav from '@/hocs/nav'

const Index = () => {
  return (
    <>
      <Nav visible={false} />
      <Console />
    </>
  )
}

export default Index
