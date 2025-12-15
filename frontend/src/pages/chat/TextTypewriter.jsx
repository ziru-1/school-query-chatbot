import React, { useState, useEffect } from 'react'

const TextTypewriter = ({ text, onDone, speed = 7 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const characters = text.split('')

  useEffect(() => {
    if (currentIndex < characters.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else {
      onDone?.()
    }
  }, [currentIndex, characters.length, speed, onDone])

  return (
    <span style={{ display: 'inline-block', minWidth: '1ch' }}>
      {characters.map((char, i) => (
        <span
          key={i}
          style={{
            visibility: i < currentIndex ? 'visible' : 'hidden',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export default TextTypewriter
