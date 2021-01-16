import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import withVisible from '@/hocs/lib/withVisible'

const Index = () => {
  const Button = styled.button((props) => ({
    fontSize: '1em',
    margin: '1em',
    padding: '0.25em 1em',
    borderRadius: '3px',
    color: props.theme.main,
    border: `2px solid ${props.theme.main}`,
  }))

  const Text = styled.p((props) => ({
    width: 800,
    margin: 14,
    color: props.theme.main,
    border: `2px solid ${props.theme.main}`,
  }))

  const greenTheme = {
    main: 'mediumseagreen',
  }

  const redTheme = {
    main: 'palevioletred',
  }

  const TextWithVisible = withVisible(Text)

  const [theme, setTheme] = useState(greenTheme)
  const [visible, setVisible] = useState(true)
  return (
    <div>
      <ThemeProvider theme={redTheme}>
        <Button
          onClick={() => {
            setTheme(redTheme)
          }}>
          Change to red theme
        </Button>
      </ThemeProvider>

      <ThemeProvider theme={greenTheme}>
        <Button
          onClick={() => {
            setTheme(greenTheme)
          }}>
          Change to green theme
        </Button>
      </ThemeProvider>

      <button
        onClick={() => {
          setVisible((prev) => !prev)
        }}>
        change visible
      </button>

      <ThemeProvider theme={theme}>
        <TextWithVisible visible={visible}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, maiores repellat
          doloremque sunt ipsum porro impedit reprehenderit labore, a doloribus corrupti obcaecati!
          Ducimus minima voluptatibus tenetur eum nostrum porro sit accusamus voluptatem hic
          repellat numquam sequi modi nobis ab accusantium incidunt quos sint, corrupti perferendis
          enim cum quis esse omnis. Eos, suscipit vero deleniti ullam assumenda id sunt numquam
          quaerat tempore adipisci, sequi eveniet. Doloribus a fuga, facilis esse excepturi
          similique perferendis eligendi aspernatur, id nihil possimus doloremque cumque tempore ab?
          Ullam corrupti magnam eaque dolores suscipit nisi, et explicabo earum perspiciatis
          pariatur saepe consequatur repellat? Corporis iusto, tempore est quas dolore beatae illum
          facere. Tempore aliquid animi illum laborum atque nesciunt quia deleniti quidem laboriosam
          mollitia, accusantium rem placeat enim odit eligendi rerum ipsum esse corrupti voluptas
          aperiam praesentium. Suscipit modi quis, dolore maiores ducimus excepturi, similique
          beatae alias architecto voluptate ab, deserunt quam neque minus autem corporis! Obcaecati
          beatae, labore, quam magnam fuga sunt laudantium aperiam velit tempore reiciendis amet
          consequatur commodi asperiores voluptates deleniti molestias ullam quia, cupiditate error
          ex? Illum neque fugiat magnam tempore laudantium mollitia nulla veritatis quisquam dolor,
          suscipit deserunt, cum beatae. Repellendus incidunt sunt doloribus eum quisquam, ab
          excepturi veritatis similique pariatur ex distinctio atque sequi inventore at repellat
          temporibus non reiciendis! Voluptas ratione obcaecati dolorum vero veritatis consectetur,
        </TextWithVisible>
      </ThemeProvider>
    </div>
  )
}

export default Index
