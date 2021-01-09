import React from 'react'
import Nav from '@/hocs/nav'
import { makeObservable, observable, action } from 'mobx'
import { observer } from 'mobx-react-lite'

class CounterState {
  count = 0

  constructor () {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
    })
  }

  increment () {
    this.count++
  }

  decrement () {
    this.count--
  }
}

const state = new CounterState()

const Counter = (): JSX.Element => {

  return (
    <>
      <Nav />
      <div>Counter = {state.count}</div>
      <button onClick={() => { state.increment() }}>Increment</button>
      <span> - </span>
      <button onClick={() => { state.decrement() }}>Decrement</button>
    </>
  )
}

export default observer(Counter)
