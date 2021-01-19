import React, { FC } from 'react'
import styled from 'styled-components'

interface props {
  direction?: string
  align?: string
  justify?: string
  margin?: string
}

const Flex = styled.div<props>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  align-items: ${({ align }) => align || 'stretch'};
  justify-content: ${({ justify }) => justify || 'stretch'};
  margin: ${({ margin }) => margin || '0'};
`

const Component: FC<props> = ({ children, ...props }) => {
  return <Flex {...props}>{children}</Flex>
}

export default Component
