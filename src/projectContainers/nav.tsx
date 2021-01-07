import React from 'react'
import Nav from '../../src/components/nav'
import { useStaticQuery, graphql } from 'gatsby'

const IndexPage: React.FC<{ visible?: boolean }> = ({ visible = true }): JSX.Element => {
  interface siteData {
      edges: any[]
  }
  const { allSiteBuildMetadata }: { allSiteBuildMetadata: siteData } = useStaticQuery(
    graphql`
      query {
        allSiteBuildMetadata {
          edges {
            node {
              fields {
                navMetaData
              }
            }
          }
        }
      }
    `
  )
  const navMetaData = allSiteBuildMetadata.edges[0].node?.fields?.navMetaData as string
  return (
    <>
      <Nav pages={navMetaData} visible={visible} />
    </>
  )
}

export default IndexPage
