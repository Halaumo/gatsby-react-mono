import React, { FC, useState } from 'react'
import styled from 'styled-components'
import Flex from './flex'

interface props {
  color?: string
  theme?: {
    colors: {
      primary: string
    }
    media: {
      phone: string
      tablet: string
    }
  }
}

const Line = styled.div<props>`
  font-size: 24px;
  color: ${({ color, theme }) => color || theme.colors.primary || 'white'};
`

const Console = styled(Line)`
  background-color: black;

  @media ${({ theme }) => theme.media.tablet} {
    border: 1px solid green;
  }

  @media ${({ theme }) => theme.media.phone} {
    border: 1px solid red;
  }
`

const Component: FC<props> = ({ children, color, ...props }) => {
  const hi = 'C:/users/ULBI_TV>'
  const [lines, setLines] = useState<string[]>([])
  const [line, setLine] = useState('')

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setLines([...lines, `${hi}${line}`])
      setLine('')
    }
  }
  return (
    <>
      <Flex>
        <Flex direction='column' margin='0 10px'>
          {lines.map((line, i) => (
            <Line key={i} color={color}>
              {line}
            </Line>
          ))}

          <Flex>
            <Line color={color}>{hi}</Line>
            <Console
              as='input'
              onKeyPress={onKeyPress}
              color={color}
              {...props}
              value={line}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLine(e.target.value)}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Component
