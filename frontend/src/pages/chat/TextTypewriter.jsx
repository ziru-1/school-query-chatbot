import React, { useState, useEffect } from 'react'

const TextTypewriter = ({ text, onDone, speed = 7 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else {
      onDone?.()
    }
  }, [currentIndex, text, speed, onDone])

  return <span>{displayedText}</span>
}

export default TextTypewriter
