import React from 'react'
import Iframe from '@/components/examples/simple/iframe'
import Nav from '@/hocs/nav'

const page = (): JSX.Element => {
  return (
    <>
      <Nav />
      <Iframe />
    </>
  )
}

export default page
