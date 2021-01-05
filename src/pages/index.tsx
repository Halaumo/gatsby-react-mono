import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'

const IndexPage = (): JSX.Element => {
  return (
    <>
      <div className='container'>
        <SEO title='Home' />
        {['404', 'fontSize', 'test/jss', 'test/child'].map((el, i) => (
          <div key={i}>
            <Link to={`/${el}/`}>{el}</Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default IndexPage
