import React, { FC } from 'react'
import styled from 'styled-components'

interface props {
  color?: string
  theme?: {
    colors?: {
      primary?: string
    }
  }
}

const Title = styled.h1<props>`
  color: ${({ color, theme }) => color || theme?.colors?.primary || 'white'};
`

const Component: FC<props> = ({ children, ...props }) => {
  return <Title {...props}>{children}</Title>
}

export default Component
