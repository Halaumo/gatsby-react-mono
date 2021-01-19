import React, { FC } from 'react'
import Nav from '@/hocs/nav'
import { makeObservable, observable, action, computed, trace, spy } from 'mobx'
import { observer } from 'mobx-react-lite'
import Game, { STATES, STATESENUM } from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/index'
import Rock from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/icons/Rock'
import Paper from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/icons/Paper'
import Scissors from '@/components/mooc/twenty_apps/u04_rockScissorsPaper/icons/Scissors'
import { xor } from '#/my/ts/utilities'
import { ObjectValues } from '#/my/ts/types'

type choices = {
  rock: {
    name: 'rock'
    component: () => JSX.Element
    losesTo: 'paper'
  }
  paper: {
    name: 'paper'
    component: () => JSX.Element
    losesTo: 'scissors'
  }
  scissors: {
    name: 'scissors'
    component: () => JSX.Element
    losesTo: 'rock'
  }
}

const choicesModel: choices = {
  rock: {
    name: 'rock',
    component: Rock,
    losesTo: 'paper',
  },
  paper: {
    name: 'paper',
    component: Paper,
    losesTo: 'scissors',
  },
  scissors: {
    name: 'scissors',
    component: Scissors,
    losesTo: 'rock',
  },
}

const indexChoices: ['paper', 'scissors', 'rock'] = ['paper', 'scissors', 'rock']

class GameState {
  state: ObjectValues<STATES> = STATESENUM.INITIAL
  wins: number = 0
  losses: number = 0
  gameResult: 'win' | 'lose' | 'draw'
  userChoise: ObjectValues<choices> = choicesModel['rock']
  computerChoise: ObjectValues<choices>
  isChangingState: boolean = false

  constructor() {
    this.restarGane()
    makeObservable(this, {
      state: observable,
      wins: observable,
      losses: observable,
      gameResult: observable,
      userChoise: observable,
      computerChoise: observable,
      restarGane: action.bound,
      handleUserChoise: action.bound,
      whoWins: action,
      userChoiseName: computed,
      computerChoiseName: computed,
      getGameResult: computed,
    })
  }

  restarGane() {
    if (!xor(this.state !== STATESENUM.INITIAL, this.state !== STATESENUM.GAMERESULT)) return
    if (this.isChangingState) return
    this.isChangingState = true

    this.gameResult = 'draw'
    const randomIndex = Math.floor(Math.random() * indexChoices.length)
    const choice = indexChoices[randomIndex]!
    const choiceMeta = choicesModel[choice]
    this.computerChoise = choiceMeta
    this.state = STATESENUM.GAME

    this.isChangingState = false
  }

  whoWins(): void {
    if (this.state !== STATESENUM.RENDERING) return
    if (this.isChangingState) return
    this.isChangingState = true

    if (this.userChoise.losesTo === this.computerChoise.name) {
      this.losses += 1
      this.gameResult = 'lose'
    } else if (this.computerChoise.losesTo === this.userChoise.name) {
      this.wins += 1
      this.gameResult = 'win'
    } else if (this.computerChoise.name === this.userChoise.name) {
      this.gameResult = 'draw'
    }

    this.state = STATESENUM.GAMERESULT
    this.isChangingState = false
  }

  handleUserChoise(choice: 'paper' | 'scissors' | 'rock') {
    if (this.state !== STATESENUM.GAME) return
    if (this.isChangingState) return
    this.isChangingState = true

    const choiceMeta = choicesModel[choice]
    this.userChoise = choiceMeta
    this.state = STATESENUM.RENDERING

    this.isChangingState = false
    this.whoWins()
  }

  get getGameResult() {
    return this.gameResult
  }

  get userChoiseName() {
    return this.userChoise.name
  }

  get computerChoiseName() {
    return this.computerChoise.name
  }
}

class Controller {
  state: GameState

  constructor(state: GameState) {
    this.state = state
    this.choicePaper = this.choicePaper.bind(this)
    this.choiceRock = this.choiceRock.bind(this)
    this.choiceScissors = this.choiceScissors.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  choicePaper(): void {
    this.state.handleUserChoise('paper')
  }

  choiceRock(): void {
    this.state.handleUserChoise('rock')
  }

  choiceScissors(): void {
    this.state.handleUserChoise('scissors')
  }

  restartGame(): void {
    this.state.restarGane()
  }
}

const state = new GameState()
const userController = new Controller(state)

const WinMessage = () => <p>Congrats! You won!</p>
const LostMessage = () => <p>You lost!</p>
const DrawMessage = () => <p>You draw!</p>

const Timer = () => {
  // trace(true)
  // spy((event) => {
  //   console.log('render?')
  // })
  return (
    <>
      <Nav visible={false} />
      {/* <div style={{ margin: 15, fontSize: 26 }}>
        <h1>Wins = {state.wins}</h1>
        <h1>Losses = {state.losses}</h1>
        <h1>User choice = {state.userChoise?.name}</h1>
        <h1>Computer choice = {state.computerChoise?.name}</h1>
        <h1>Game result = {state.gameResult}</h1>
        <div>
          <button onClick={userController.choicePaper}>Choice paper</button>
        </div>
        <div>
          <button onClick={userController.choiceScissors}>Choice scissors</button>
        </div>
        <div>
          <button onClick={userController.choiceRock}>Choice rock</button>
        </div>
        <div>
          <button disabled={state.state !== STATESENUM.GAMERESULT} onClick={userController.restartGame}>Restart game</button>
        </div>
      </div> */}
      <Game
        ui={{
          rock: Rock,
          paper: Paper,
          scissors: Scissors,
          gameResult: {
            win: WinMessage,
            lose: LostMessage,
            draw: DrawMessage,
          },
        }}
        choicePaper={userController.choicePaper}
        choiceRock={userController.choiceRock}
        choiceScissors={userController.choiceScissors}
        restartGame={userController.restartGame}
        gameResult={state.getGameResult}
        gameState={state.state}
        wins={state.wins}
        losses={state.losses}
        userChoice={state.userChoiseName}
        computerChoice={state.computerChoiseName}
      />
    </>
  )
}

export default observer(Timer)
