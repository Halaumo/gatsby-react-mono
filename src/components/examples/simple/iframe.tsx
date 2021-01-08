import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  myDiv: {
    margin: '15px auto 0',
    width: 1280,
    height: 720,
  },
  myIframe: {
    width: '100%',
    height: '100%',
    border: 0,
  },
})
const Index = () => {
  const style = useStyles()

  return (
    <>
    <div className={style.myDiv}>
      <iframe
        title='youtube'
        className={style.myIframe}
        src='https://www.youtube.com/embed/XZr_xRh-vmo'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen>
      </iframe>
    </div>

    </>
  )
}

export default Index
