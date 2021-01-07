import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  tree: () => ({
    [`& p`]: {
      fontSize: 24,
    },
    [`& a`]: {
      fontSize: 24,
      color: 'blue',
      [`&:hover`]: {
        color: 'red',
      },
    },
    [`& > ul`]: {
      marginLeft: 10,
    },
  }),
  myDivVisible: () => ({
    position: 'fixed',
    padding: 10,
    backgroundColor: '#f1f1f1',
  }),
  myDivHidden: () => ({}),
})

const IndexPage = ({ pages }: { pages: string }): JSX.Element => {
  // data-parsing
  const data: (string | { [key: string]: [] })[] = JSON.parse(pages)

  const stringLinkRender = (s: string): JSX.Element => {
    const baseName = s.split('/').pop()
    return (
      <li>
        <Link to={s}>{baseName}</Link>
      </li>
    )
  }

  const objectRender = (o: { [key: string]: [] }, root = ''): JSX.Element => {
    const keys = Object.keys(o)
    const res: JSX.Element[] = []
    for (const key of keys) {
      res.push(
        <li>
          <p>{`${key}/`}</p>
        </li>
      )
      res.push(<ul>{render(o[key]!, `${root}/${key}`)}</ul>)
    }
    return <>{res}</>
  }

  const render = (data: (string | { [key: string]: [] })[], root = ''): JSX.Element => {
    return (
      <>
        {data.map((el) => {
          if (typeof el === 'string') {
            const baseName = el.split('.')[0]
            return stringLinkRender(`${root}/${baseName}`)
          }
          return objectRender(el, root)
        })}
      </>
    )
  }

  // styles
  const classes = useStyles()
  const tree = useRef(null)
  const [styleClass, setStyleClass] = useState({
    isVisible: true,
    style: classes.myDivVisible,
  })

  const toggleTree = (event: KeyboardEvent) => {
    const { key } = event
    if (!(key === 'Escape')) return
    if (styleClass.isVisible) {
      setStyleClass({ isVisible: false, style: classes.myDivHidden })
    } else {
      setStyleClass({ isVisible: true, style: classes.myDivVisible })
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', toggleTree)
  }, [styleClass])

  // useEffect(() => {}, [styleClass])

  return (
    <>
      <div className={styleClass.style} ref={tree}>
        <ul className={classes.tree}>{render(data)}</ul>
      </div>
    </>
  )
}

export default IndexPage
