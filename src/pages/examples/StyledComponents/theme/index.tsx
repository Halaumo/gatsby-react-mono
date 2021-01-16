import React from 'react'
import Component from '@/components/examples/StyledComponents/theme/index'
import Nav from '@/hocs/nav'

const Index = () => {
  return (
    <>
      <Nav visible={false} />
      <Component />
    </>
  )
}

export default Index
