import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import withVisible from '@/hocs/lib/withVisible'
import Nav from '@/hocs/nav'
import { makeObservable, observable, action, computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import Game from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/index'
import Rock from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/icons/Rock'
import Paper from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/icons/Paper'
import Scissors from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/icons/Scissors'

type ObjectValues<A extends object> = A[keyof A]

type choices = {
  rock: {
    component: () => JSX.Element
    losesTo: 'paper'
  },
  paper: {
    component: () => JSX.Element,
    losesTo: 'scissors',
  },
  scissors: {
    component: () => JSX.Element,
    losesTo: 'rock',
  },
}

const choices: choices = {
  rock: {
    component: Rock,
    losesTo: 'paper',
  },
  paper: {
    component: Paper,
    losesTo: 'scissors',
  },
  scissors: {
    component: Scissors,
    losesTo: 'rock',
  },
}

const indexChoices: ['paper', 'scissors', 'rock'] = ['paper', 'scissors', 'rock']

// class GameState {
//   wins: number = 0
//   losses: number = 0
//   gameState: '' | 'win' | 'lose' | 'draw'
//   userChoise: ObjectValues<choices> | null
//   computerChoise: ObjectValues<choices> | null

//   constructor () {
//     makeObservable(this, {
//       wins: observable,
//       losses: observable,
//       gameState: observable,
//       userChoise: observable,
//       computerChoise: observable,
//       restarGane: action.bound,
//       handleUserChoise: action.bound,
//     })
//     this.restarGane()
//   }

//   restarGane() {
//     this.gameState = ''
//     this.userChoise = ''

//     const randomIndex = Math.floor(Math.random() * indexChoices.length)
//     const choice = indexChoices[randomIndex]!
//     const choiceMeta = choices[choice]
//     this.computerChoise = choiceMeta
//   }

//   handleUserChoise (choice: 'paper' | 'scissors' | 'rock') {
//     const choiseMeta = choices[choice]

//   }
// }

// const state = new GameState()

const Timer = () => {

  return (
    <>
      <Nav visible={false} />
      {/* <Game
        Rock={Rock}
        Scissors={Scissors}
        Paper={Paper}
      /> */}
    </>
  )
}

export default observer(Timer)
