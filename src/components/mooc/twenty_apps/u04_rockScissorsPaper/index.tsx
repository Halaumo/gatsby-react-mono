import React, { FC, useMemo, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ObjectValues } from '#/my/ts/types'

type gameResults = 'win' | 'lose' | 'draw'
type choices = 'paper' | 'scissors' | 'rock'

export type STATES = {
  INITIAL: 'initial'
  GAME: 'game'
  RENDERING: 'rendering'
  GAMERESULT: 'gameresult'
}

export const STATESENUM: STATES = {
  INITIAL: 'initial',
  GAME: 'game',
  RENDERING: 'rendering',
  GAMERESULT: 'gameresult',
}

const App = styled.div({
  fontFamily: 'sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  paddingTop: '50px',
  paddingLeft: '50px',
  paddingRight: '50px',
  background: '#478aef',
  color: '#cadbf5',
})

const Info = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginBottom: 50,

  '& h2': {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'center',
  },
})

const WinsLosses = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontFamily: 'Varela Round, sans-serif',
  fontSize: 16,
  textAlign: 'center',
  lineHeight: 1,
})

const Wins = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: 30,
})

const Losses = styled.div({
  display: 'flex',
  alignItems: 'center',
})

const Number = styled.span((props) => ({
  fontSize: 52,
  marginRight: 5,
  color: `${props.theme.color}`,
}))

const Text = styled.span({})

const Choices = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  textAlign: 'center',
  gridGap: 20,
  fontFamily: 'Varela Round, sans-serif',
  fontSize: 18,
  color: '#5f99f0',

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& button': {
    cursor: 'pointer',
    fontSize: 50,
    marginBottom: 20,
    padding: 20,
    background: '#fff',
    outline: 'none',
    border: 'none',
    borderRadius: '50%',
    height: 100,
    width: 100,
    transition: '0.1s ease all',

    '&:hover': {
      transform: 'scale(1.07)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  },
})

const Vs = styled.div({
  width: 100,
  fontSize: 100,
  opacity: '0.25',
  transform: 'rotate(-0.1turn)',
  pointerEvents: 'none',
})

const BtnWithSvg = styled.button((props) => ({
  background: `${props.theme.background}`,
  '& path': {
    fill: `${props.theme.fill}`,
  },
}))

const ComputerChoiceBtn = styled.button({
  background: '#333',
  color: '#bbb',
  '& path': {
    fill: '#bbb',
  },
})

const GameResultPopup = styled.div((props) => ({
  display: `${props.theme.display}`,
  background: 'rgba(0, 0, 0, 0.5)',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 24,
  lineHeight: '1.3',
  fontFamily: 'Varela Round, sans-serif',
}))

const GameResultContainer = styled.div((props) => ({
  background: `${props.theme.background}`,
  color: `${props.theme.color}`,

  '& svg path': {
    fill: `${props.theme.fill}`,
  },
}))

const GameResultContent = styled.div({
  display: 'flex',
  justifyContent: 'center',

  '& p': {
    margin: '40px 15px 30px 0',
    display: 'flex',
    alignItems: 'center',
  },

  '& svg': {
    width: 100,
  },
})

const RestartButton = styled.button({
  marginBottom: '-5%',
  width: '100%',
  display: 'block',
  border: 'none',
  borderRadius: 10,
  padding: 25,
  fontSize: 30,
  cursor: 'pointer',
  flexShrink: 1,
  background: '#fa65ff',
  color: '#fdedfd',
})

const GREEN = '#5dc674'
const RED = '#da516f'

const btnWithSvgThemes = {
  rock: {
    background: '#f7941a',
    fill: '#815116',
  },
  paper: {
    background: '#8dc351',
    fill: '#3f5e1b',
  },
  scissors: {
    background: '#7c79ea',
    fill: '#2f2c8f',
  },
}

const gameResultPopupThemes = {
  initial: {
    display: 'none',
  },
  game: {
    display: 'none',
  },
  rendering: {
    display: 'none',
  },
  gameresult: {
    display: 'flex',
  },
}

const gameResultContainerThemes = {
  win: {
    background: 'rgb(141, 195, 81)',
    color: 'rgb(226, 243, 206)',
    fill: 'rgb(226, 243, 206)',
  },
  draw: {
    background: 'rgb(0, 0, 0)',
    color: 'rgb(88, 88, 88)',
    fill: 'rgb(88, 88, 88)',
  },
  lose: {
    background: 'rgb(218, 81, 111)',
    color: 'rgb(240, 169, 184)',
    fill: 'rgb(240, 169, 184)',
  },
}

interface props {
  ui: {
    rock: FC
    paper: FC
    scissors: FC
    gameResult: {
      win: FC
      lose: FC
      draw: FC
    }
  }
  gameState: ObjectValues<STATES>
  wins: number
  losses: number
  gameResult: gameResults
  choicePaper: (event?: React.SyntheticEvent<unknown>) => void
  choiceRock: (event?: React.SyntheticEvent<unknown>) => void
  choiceScissors: (event?: React.SyntheticEvent<unknown>) => void
  restartGame: (event?: React.SyntheticEvent<unknown>) => void
  userChoice: choices
  computerChoice: choices
}

const Game: FC<props> = ({
  ui,
  wins,
  losses,
  gameState,
  gameResult,
  choicePaper,
  choiceRock,
  choiceScissors,
  userChoice,
  computerChoice,
  restartGame,
}) => {
  // const GameResultPopupTheme = useMemo(() => gameResultPopupThemes[gameState], [gameState])
  // const gameResultContainerTheme = useMemo(() => gameResultContainerThemes[gameResult], [
  //   gameResult,
  // ])
  const Rock = useMemo(() => ui['rock'], [ui])
  const Paper = useMemo(() => ui['paper'], [ui])
  const Scissors = useMemo(() => ui['scissors'], [ui])
  const UserComponent = useCallback(ui[userChoice], [userChoice])
  const ComputerComponent = useCallback(ui[computerChoice], [computerChoice])
  const GameResultComponent = useCallback(ui.gameResult[gameResult], [gameResult])

  return (
    <App>
      <Info>
        <h2>Rock. Paper. Scissors</h2>

        <WinsLosses>
          <ThemeProvider theme={{ color: RED }}>
            <Wins>
              <Number>{wins}</Number>
              <Text>{wins === 1 ? 'Win' : 'Wins'}</Text>
            </Wins>
          </ThemeProvider>

          <ThemeProvider theme={{ color: GREEN }}>
            <Losses>
              <Number>{losses}</Number>
              <Text>{losses === 1 ? 'Loss' : 'Losses'}</Text>
            </Losses>
          </ThemeProvider>
        </WinsLosses>

        <ThemeProvider theme={{ theme: gameResultPopupThemes[gameState] }}>
          <GameResultPopup>
            <ThemeProvider theme={{ theme: gameResultContainerThemes[gameResult] }}>
              <GameResultContainer>
                <GameResultContent>
                  <UserComponent />

                  <GameResultComponent />

                  <ComputerComponent />
                </GameResultContent>

                <RestartButton onClick={restartGame}>Play Again</RestartButton>
              </GameResultContainer>
            </ThemeProvider>
          </GameResultPopup>
        </ThemeProvider>

        <Choices>
          <div>You</div>
          <div />
          <div>Computer</div>

          <div>
            <ThemeProvider theme={{ theme: btnWithSvgThemes['rock'] }}>
              <BtnWithSvg onClick={choiceRock}>
                <Rock />
              </BtnWithSvg>
            </ThemeProvider>

            <ThemeProvider theme={{ theme: btnWithSvgThemes['paper'] }}>
              <BtnWithSvg onClick={choicePaper}>
                <Paper />
              </BtnWithSvg>
            </ThemeProvider>

            <ThemeProvider theme={{ theme: btnWithSvgThemes['scissors'] }}>
              <BtnWithSvg onClick={choiceScissors}>
                <Scissors />
              </BtnWithSvg>
            </ThemeProvider>
          </div>

          <Vs>vs</Vs>

          <div>
            <ComputerChoiceBtn>?</ComputerChoiceBtn>
          </div>
        </Choices>
      </Info>
    </App>
  )
}

export default Game
