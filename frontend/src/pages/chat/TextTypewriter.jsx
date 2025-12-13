import React from 'react'
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'motion/react'

const TextTypewriter = ({ onDone, text }) => {
  const characters = text.split('')

  return (
    <span>
      {characters.map((char, i) => {
        const isLastChar = i === characters.length - 1
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: i * 0.01 }}
            onAnimationComplete={isLastChar ? onDone : undefined}
          >
            {char}
          </motion.span>
        )
      })}
    </span>
  )
}

export default TextTypewriter
