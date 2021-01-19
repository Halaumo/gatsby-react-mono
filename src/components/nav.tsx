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
    top: 0,
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    zIndex: 9999,
    overflow: 'scroll',
    maxHeight: '100vh',
    maxWidth: '25vw',
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

  const checkIsIndex = (s: string) => (s.endsWith('/index') ? s.replace(/\/index$/, '/') : s)
  const chechIs404 = (s: string) => s.includes('404')

  const StringLinkRender: React.FC<{ value: string }> = ({ value }) => {
    const is404 = chechIs404(value)
    if (is404) return <></>
    const baseName = value.split('/').pop()
    const linkValue = checkIsIndex(value)
    return (
      <li>
        <Link to={linkValue}>{baseName}</Link>
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
          {Array.isArray(o[key]) ? (
            <ul>
              <Render data={o[key]!} root={`${root}/${key}`} />
            </ul>
          ) : undefined}
        </li>
      )
    }
    return <>{res}</>
  }

  const Render: React.FC<{ data: (string | { [key: string]: [] })[]; root: string }> = ({
    data,
    root,
  }): JSX.Element => {
    return (
      <>
        {data.map((el) => {
          if (typeof el === 'string') {
            const baseName = el.split('.')[0]!
            return <StringLinkRender key={`${root}/${baseName}`} value={`${root}/${baseName}`} />
          } else if (typeof el === 'object') {
            return <ObjectRender key={uuid()} o={el} root={root} />
          }
          return <></>
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
          <ul className={classes.tree}>
            <Render data={data} root={''} />
          </ul>
        </div>
      </div>
    </>
  )
}

export default IndexPage
