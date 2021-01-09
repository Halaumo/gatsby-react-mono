import React from 'react'
import FlipCard from '@/components/mooc/michail_n/flipcard/flipcard'
import Nav from '@/hocs/nav'

const TablePage = () => {
  return (
    <>
      <Nav visible={false}/>
      <FlipCard />
    </>
  )
}

export default TablePage
