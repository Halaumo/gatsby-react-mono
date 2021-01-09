import React, { useEffect, useRef, useState } from 'react'
import css from './timer.module.sass'
import classNames from 'classnames'

const Timer = () => {
  // const section
  const time = 5
  const [title, setTitle] = useState('Let the countdown begin!')
  const [timeLeft, setTimeLeft] = useState(time)
  const [isRunning, setIsRunning] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isNewTimer, setIsNewTimer] = useState(true)
  const intervalRef: React.MutableRefObject<any> = useRef(null)
  const timeoutRef: React.MutableRefObject<any> = useRef(null)

  // function section
  const startTimerHandler = () => {
    if (intervalRef.current !== null) return
    setTitle(`You're doing great!`)
    setIsRunning(true)
    setIsNewTimer(false)
    intervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time >= 1) {
          return time - 1
        }
        return 0
      })
    }, 1000)
  }

  const stopTimerHandler = () => {
    if (!clearIntervalRef()) return
    setTitle('Keep it up!')
    setIsRunning(false)
  }

  const resetTimerHandler = () => {
    if (isNewTimer) return
    clearTimeoutRef()
    clearIntervalRef()
    setTimeLeft(time)
    setTitle('Ready to go another round?')
    setIsRunning(false)
    setIsDisabled(false)
    setIsNewTimer(true)
  }

  // helper functions
  function clearIntervalRef() {
    if (intervalRef.current === null) return false
    clearInterval(intervalRef.current)
    intervalRef.current = null
    return true
  }

  function clearTimeoutRef() {
    if (timeoutRef.current === null) return false
    clearTimeout(timeoutRef.current)
    timeoutRef.current = null
    return true
  }

  useEffect(() => {
    if (timeLeft > 0) return
    setTitle('Timer end. Great job!')
    setIsDisabled(true)
    clearIntervalRef()
    timeoutRef.current = setTimeout(resetTimerHandler, 2500)
  }, [timeLeft])

  // computed section
  const minutes = `${Math.floor(timeLeft / 60)}`.padStart(2, '0')
  const seconds = `${timeLeft - +minutes * 60}`.padStart(2, '0')

  return (
    <div className={css.app}>
      <h1>{title}</h1>

      <div className={css.timer}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className={css.buttons}>
        {isRunning && (
          <button
            disabled={isDisabled}
            className={classNames({ [`${css.disabled}`]: isDisabled })}
            onClick={stopTimerHandler}>
            Stop
          </button>
        )}
        {!isRunning && (
          <button
            disabled={isDisabled}
            className={classNames({ [`${css.disabled}`]: isDisabled })}
            onClick={startTimerHandler}>
            Start
          </button>
        )}
        <button onClick={resetTimerHandler}>Reset</button>
      </div>
    </div>
  )
}

export default Timer
