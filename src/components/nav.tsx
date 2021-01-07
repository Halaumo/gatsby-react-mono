import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { createUseStyles } from 'react-jss'
import { v4 as uuid } from 'uuid'

const useStyles = createUseStyles({
  tree: () => ({
    [`& p`]: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    [`& a`]: {
      fontSize: 24,
      fontWeight: 'italic',
      color: 'blue',
      [`&:hover`]: {
        color: 'red',
      },
    },
    [`& ul`]: {
      marginLeft: 10,
    },
  }),
  myDiv: {
    position: 'fixed',
    left: 0,
    top: '25%',
    transform: 'translateY(-50%)',
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  myDivVisible: {
    composes: '$myDiv',
    display: 'block',
  },
  myDivHidden: {
    composes: '$myDiv',
    display: 'none',
  },
  myDivHiddenDoublesCssWhenLambda: () => ({
    composes: '$myDiv',
  }),
})

const IndexPage: React.FC<{ pages: string; visible: boolean }> = ({
  pages,
  visible,
}): JSX.Element => {
  // data-parsing
  const data: (string | { [key: string]: [] })[] = JSON.parse(pages)

  const checkIsRoot = (s: string) => (s === '/index' ? '/' : s)

  const StringLinkRender: React.FC<{ value: string }> = ({ value }) => {
    const baseName = value.split('/').pop()
    return (
      <li>
        <Link to={checkIsRoot(value)}>{baseName}</Link>
      </li>
    )
  }

  const ObjectRender: React.FC<{ o: { [key: string]: [] }; root: string }> = ({
    o,
    root = '',
  }): JSX.Element => {
    const keys = Object.keys(o)
    const res: JSX.Element[] = []
    for (const key of keys) {
      res.push(
        <li key={`${root}/${key}`}>
          <p>{`${key}/`}</p>
          <ul>{render(o[key]!, `${root}/${key}`)}</ul>
        </li>
      )
    }
    return <>{res}</>
  }

  const render = (data: (string | { [key: string]: [] })[], root = ''): JSX.Element => {
    return (
      <>
        {data.map((el) => {
          if (typeof el === 'string') {
            const baseName = el.split('.')[0]
            return <StringLinkRender key={`${root}/${baseName}`} value={`${root}/${baseName}`} />
          }
          return <ObjectRender key={uuid()} o={el} root={root} />
        })}
      </>
    )
  }

  // styles
  const classes = useStyles()
  const [isVisible, setIsVisible] = useState(visible)

  const toggleTree = (event: KeyboardEvent) => {
    const { key } = event
    if (!(key === 'Escape')) return
    setIsVisible((prevIsVisible) => !prevIsVisible)
  }

  useEffect(() => {
    window.addEventListener('keydown', toggleTree)

    return () => {
      window.removeEventListener('keydown', toggleTree)
    }
  }, [isVisible])

  return (
    <>
      <div>
        <div className={isVisible ? classes.myDivVisible : classes.myDivHidden} key={uuid()}>
          <ul className={classes.tree}>{render(data)}</ul>
        </div>
      </div>
    </>
  )
}

export default IndexPage
