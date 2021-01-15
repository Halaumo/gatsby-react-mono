import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import withVisible from '@/hocs/lib/withVisible'

const useStyles = createUseStyles({
  '@import': 'url(https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap)',
  app: {
    fontFamily: 'Major Mono Display, monospace',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& h1': {
      color: '#49b2b8',
      fontSize: '30px',
      textAlign: 'center',
      margin: 0,
    },
  },
  timer: {
    color: '#1f6e72',
    fontSize: '150px',
    marginBottom: '20px',
  },
  buttons: {
    '& button': {
      outline: 'none',
      border: 'none',
      fontSize: '24px',
      background: '#f7fca0',
      color: '#878b32',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      padding: '15px 30px',
      cursor: 'pointer',
      transition: '0.3s ease all',
    },
    '& button:hover': {
      borderRadius: '10px',
      background: '#f5f8ca',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px)',
    },
    '& button:not(:last-child)': {
      marginRight: '10px',
    },
  },
  disabled: {
    opacity: '.2',
    '&:hover': {
      cursor: 'wait',
    },
  },
})

interface props {
  title: string
  minutes: string
  seconds: string
  isRunning: boolean
  isDisabled: boolean
  isNewTimer: boolean
  stopTimer: (event?: React.SyntheticEvent<unknown>) => void
  startTimer: (event?: React.SyntheticEvent<unknown>) => void
  resetTimer: (event?: React.SyntheticEvent<unknown>) => void
}

const Timer: FC<props> = ({
  title,
  minutes,
  seconds,
  isRunning,
  isDisabled,
  isNewTimer,
  stopTimer,
  startTimer,
  resetTimer,
}) => {
  const css = useStyles()

  const StopButton = () => (
    <button
      disabled={isDisabled}
      onClick={stopTimer}
      className={isDisabled ? css.disabled : undefined}>
      Stop
    </button>
  )

  const StartButton = () => (
    <button
      disabled={isDisabled}
      onClick={startTimer}
      className={isDisabled ? css.disabled : undefined}>
      Start
    </button>
  )

  const StopButtonWithVisible = withVisible(StopButton)
  const StartButtonWithVisible = withVisible(StartButton)

  return (
    <div className={css.app}>
      <h1>{title}</h1>

      <div className={css.timer}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className={css.buttons}>
        <StopButtonWithVisible visible={isRunning} />
        <StartButtonWithVisible visible={!isRunning} />
        <button
          onClick={resetTimer}
          disabled={isNewTimer}
          className={isNewTimer ? css.disabled : undefined}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default Timer
