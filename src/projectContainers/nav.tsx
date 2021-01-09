import React from 'react'
import Nav from '@/components/nav'
import { useStaticQuery, graphql } from 'gatsby'

const IndexPage: React.FC<{ visible?: boolean }> = ({ visible = true }): JSX.Element => {
  interface siteData {
      edges: any[]
  }
  const { allNavMetaData }: { allNavMetaData: siteData } = useStaticQuery(
    graphql`
      query {
        allNavMetaData {
          edges {
            node {
              internal {
                content
              }
            }
          }
        }
      }
    `
  )
  const navMetaData = allNavMetaData.edges[0].node?.internal?.content as string
  return (
    <>
      {navMetaData}
      {/* <Nav pages={navMetaData} visible={visible} /> */}
    </>
  )
}

export default IndexPage
