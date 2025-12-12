import React from 'react'
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'motion/react'

const TextTypewriter = ({ text }) => {
  const characters = text.split('')

  return (
    <span>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: i * 0.01 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default TextTypewriter
