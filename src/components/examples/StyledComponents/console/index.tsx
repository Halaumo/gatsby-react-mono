import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Flex from './components/flex'
import Title from './components/title'
import Console from './components/console'
import Button from './components/button'

const Global = createGlobalStyle`
  * {
    font-family: consolas;
  }
`

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: black;
`

const theme = {
  colors: {
    primary: 'green',
    secondary: 'red',
  },
  media: {
    phone: '(max-width: 425px)',
    tablet: '(max-width: 768px)',
  },
}

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Wrapper>
        <Flex justify='center'>
          <Title>Console cmd 2021. Ulbi TV</Title>
        </Flex>

        <Flex direction='column' margin='10px 0'>
          <Console />
          <Button color="green"  align="flex-end">Spinner</Button>
        </Flex>
      </Wrapper>
    </ThemeProvider>
  )
}

export default Index
