import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'

const IndexPage = () => (
  <>
    <SEO title='Home' />
    <Link to='/404/'>Go to page 404</Link>
  </>
)

export default IndexPage
