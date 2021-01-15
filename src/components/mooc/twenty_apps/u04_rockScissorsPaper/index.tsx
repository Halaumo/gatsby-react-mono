import React, { FC } from 'react'
import { createUseStyles } from 'react-jss'
import withVisible from '@/hocs/lib/withVisible'

const useStyles = createUseStyles({
  app: {},
  info: {},
  winsLosses: {},
  wins: {},
  losses: {},
  number: {},
  text: {},
  gameState: {},
  gameStateContent: {},
  choices: {},
  rock: {},
  paper: {},
  scissors: {},
  vs: {},
  computerChoise: {},
})

interface props {
  wins: number
  losses: number
  gameState: '' | 'win' | 'lose' | 'draw'
  userChoise: (choice: 'rock' | 'paper' | 'scissors') => void
  Rock: FC
  Paper: FC
  Scissors: FC
}

const Timer: FC<props> = ({ wins, losses, gameState, userChoise }) => {
  const css = useStyles()

  const GameStatePopup = () => <></>
  const GameStatePopupWithVisible = withVisible(GameStatePopup)

  return (
    <div className={css.app}>
      <div className={css.info}>
        <h2>Rock. Paper. Scissors</h2>

        <div className={css.winsLosses}>
          <div className={css.wins}>
            <span className={css.number}>{wins}</span>
            <span className={css.text}>{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className={css.losses}>
            <span className={css.number}>{losses}</span>
            <span className={css.text}>{losses === 1 ? 'Loss' : 'Losses'}</span>
          </div>
        </div>

        <GameStatePopupWithVisible visible={gameState !== ''} />

        <div className={css.choices}>
          <div>You</div>
          <div />
          <div>Computer</div>

          {/* <div>
            <button className={css.rock} onClick={userChoise.bind('rock')}>
              <Rock />
            </button>

            <button className={css.paper} onClick={userChoise.bind('paper')}>
              <Paper />
            </button>

            <button className={css.scissors} onClick={userChoise.bind('scissors')}>
              <Scissors />
            </button>
          </div> */}
        </div>

        <div className={css.vs}>vs</div>

        <div>
          <button className={css.computerChoise}>?</button>
        </div>
      </div>
    </div>
  )
}

export default Timer
