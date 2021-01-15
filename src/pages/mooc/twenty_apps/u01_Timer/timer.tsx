import React from 'react'
import Timer from '@/components/mooc/twenty_apps/u01_Timer/timer/timer'
import Nav from '@/hocs/nav'
import { makeObservable, observable, action, computed } from 'mobx'
import { observer } from 'mobx-react-lite'

class TimerState {
  time: number = 5
  timeLeft: number = this.time
  title: string = 'Let the countdown begin!'
  isRunning: boolean = false
  isDisabled: boolean = false
  isNewTimer: boolean = true

  // only inside this class
  intervalRef: number | null = null
  timeoutRef: number | null = null

  constructor() {
    makeObservable(this, {
      timeLeft: observable,
      title: observable,
      isRunning: observable,
      isDisabled: observable,
      isNewTimer: observable,
      stopTimer: action.bound,
      startTimer: action.bound,
      resetTimer: action.bound,
      subTimeLeft: action.bound,
      checkIsTimerEnd: action,
      minutes: computed,
      seconds: computed,
      getTitle: computed,
    })
  }

  // helpers
  clearIntervalRef(): boolean {
    if (this.intervalRef === null) return false
    clearInterval(this.intervalRef)
    this.intervalRef = null
    return true
  }

  clearTimeoutRef(): boolean {
    if (this.timeoutRef === null) return false
    clearTimeout(this.timeoutRef)
    this.timeoutRef = null
    return true
  }

  checkIsTimerEnd(): boolean {
    if (this.timeLeft > 0) return false
    this.title = 'Timer end. Great job!'
    this.isDisabled = true
    this.clearIntervalRef()
    this.intervalRef = window.setTimeout(this.resetTimer, 2500)
    return true
  }

  subTimeLeft(): void {
    if (!this.checkIsTimerEnd()) {
      this.timeLeft -= 1
    } else {
      this.timeLeft = 0
    }
  }

  // main
  startTimer(event?: React.SyntheticEvent<unknown>): void {
    if (this.intervalRef !== null) return
    this.title = `You're doing great!`
    this.isRunning = true
    this.isNewTimer = false
    this.intervalRef = window.setInterval(this.subTimeLeft, 1000)
  }

  stopTimer(event?: React.SyntheticEvent<unknown>): void {
    if (!this.clearIntervalRef()) return
    this.title = 'Keep it up!'
    this.isRunning = false
  }

  resetTimer(event?: React.SyntheticEvent<unknown>): void {
    if (this.isNewTimer) return
    this.clearTimeoutRef()
    this.clearIntervalRef()
    this.timeLeft = this.time
    this.title = 'Ready to go another round?'
    this.isRunning = false
    this.isDisabled = false
    this.isNewTimer = true
  }

  get minutes(): string {
    return `${Math.floor(this.timeLeft / 60)}`.padStart(2, '0')
  }

  get seconds(): string {
    return `${this.timeLeft - +this.minutes * 60}`.padStart(2, '0')
  }

  get getTitle(): string {
    return this.title
  }
}

const state = new TimerState()

const TablePage = () => {
  return (
    <>
      <Nav visible={false} />
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#87d7cc',
        color: '#2c888d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Timer
          title={state.getTitle}
          minutes={state.minutes}
          seconds={state.seconds}
          isRunning={state.isRunning}
          isDisabled={state.isDisabled}
          isNewTimer={state.isNewTimer}
          startTimer={state.startTimer}
          stopTimer={state.stopTimer}
          resetTimer={state.resetTimer}
        />
      </div>
    </>
  )
}

export default observer(TablePage)
