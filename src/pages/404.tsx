import React from 'react'
import SEO from '@/components/seo'
import Nav from '@/projectContainers/nav'

const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <Nav />
      <SEO title='404: Not found' />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  )
}

export default NotFoundPage
