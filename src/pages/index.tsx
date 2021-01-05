import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'

const IndexPage = (): JSX.Element => (
  <>
    <div className='container'>
      <SEO title='Home' />
      <div>
        <Link to='/404/'>Go to page 404</Link>
      </div>
      <div>
        <Link to='/fontSize/'>Go to page fontSize</Link>
      </div>
    </div>
  </>
)

export default IndexPage
