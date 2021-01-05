import React from 'react'
import { createUseStyles } from 'react-jss'

interface styles {
  myButton: {
    heigth: number
    padding: number
  }
  myLabel: {
    fontSize: number
  }
}

const useStyles = createUseStyles({
  myButton: (props: styles) => ({
    heigth: props.myButton.heigth,
    padding: props.myButton.padding,
    backgroundColor: 'green',
    '& div': {
      backgroundColor: 'red',
      margin: {
        top: 15, // 15px
        right: 15,
        bottom: 15,
        left: 15,
      },
    },
  }),
  myLabel: (props: styles) => ({
    fontStyle: 'italic',
    fontSize: props.myLabel.fontSize,
  }),
})

const JssPage: React.FC<styles> = ({ children, ...props }): JSX.Element => {
  const classes = useStyles(props)
  return (
    <>
      <div className={classes.myButton}>
        <div className={classes.myLabel}>{children}</div>
      </div>
    </>
  )
}

export default JssPage
