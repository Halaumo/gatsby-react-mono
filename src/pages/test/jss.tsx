import React from 'react'
import JssPage from '../../components/test/jss'
import Nav from '@/projectContainers/nav'

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Nav visible={false}/>
      <JssPage myButton={{ heigth: 2000, padding: 15 }} myLabel={{ fontSize: 20 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iure dolorem suscipit cum
        minima pariatur, soluta amet doloremque quis aspernatur libero. Beatae sed magni temporibus.
        Voluptas facere commodi, omnis in repellat, totam illum incidunt recusandae aliquam
        repudiandae, aut aspernatur officia?
      </JssPage>
    </>
  )
}

export default IndexPage
