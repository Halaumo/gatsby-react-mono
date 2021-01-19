import React, { FC } from 'react'
import styled, { css, keyframes } from 'styled-components'

const rotateAnimation = keyframes`
  0% {
      transform: rotateZ(0deg);
  }
  100% {
      transform: rotateZ(360deg);
  }
`
interface props {
  primary?: boolean
  outlined?: boolean
  align?: string
  color?: string
  background?: string
}

const StyledBtn = styled.button.attrs(() => ({
  outlined: true,
}))<props>`
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  align-self: ${({ align }) => align || 'stretch'};

  &:focus {
    outline: none;
  }

  &:hover {
    animation: ${rotateAnimation} 1s infinite linear;
  }

  ${({ primary }) =>
    primary &&
    css<props>`
      color: ${({ color }) => color || 'white'};
      background: ${({ background }) => background || 'white'};
    `}

  ${({ outlined }) =>
    outlined &&
    css<props>`
      color: ${({ color }) => color || 'white'};
      border: ${({ color }) => color || 'white'};
      background: transparent;
    `}
`

const Component: FC<props> = ({ children, ...props }) => {
  return <StyledBtn {...props}>{children}</StyledBtn>
}

export default Component
