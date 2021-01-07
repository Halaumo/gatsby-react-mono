import React, { useState } from 'react'
import Nav from '@/projectContainers/nav'

const TextPage = (): JSX.Element => {
  const [fontSize, setFontSize] = useState(16)
  const increaseFontSize = () => {
    setFontSize(() => fontSize + 1)
  }

  const decreaseFontSize = () => {
    setFontSize(() => fontSize - 1)
  }

  return (
    <>
      <Nav />
      <h1>Font size = {fontSize}</h1>
      <button type='button' onClick={increaseFontSize}>
        Increase
      </button>
      <button type='button' onClick={decreaseFontSize}>
        Decrease
      </button>
      <p style={{ fontSize }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, esse. Voluptate vero eius
        animi repellat unde tempore, mollitia illo ex!
      </p>
    </>
  )
}
export default TextPage
