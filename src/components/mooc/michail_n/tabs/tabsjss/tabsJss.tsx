import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  tabs: {
    marginLeft: 50,
    marginTop: 20,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
  },
  headItem: {
    padding: '5px 10px',
    fontSize: 20,
    border: '1px solid black',
    marginRight: 10,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  headItemActive: {
    composes: '$headItem',
    position: 'relative',
    marginTop: 10,
  },
  content: {
    position: 'relative',
    marginTop: 10,
  },
  contentItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    transform: 'translateX(100px)',
  },
  contentItemActive: {
    composes: '$contentItem',
    transition: 'all 0.25s ease-in-out',
    transform: 'translateX(0)',
    opacity: '1',
  },
})

const Table = () => {
  const styles = useStyles()

  return (
    <>
     <p>Зачем это переписывать?</p>
    </>
  )
}

export default Table
