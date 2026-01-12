import React from 'react'

const ConfidenceBadge = ({ confidence }) => {
  const HIGH_THRESHOLD = 0.55
  const LOW_THRESHOLD = 0.35
  let color

  if (confidence >= HIGH_THRESHOLD) {
    color = 'bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-200'
  } else if (confidence >= LOW_THRESHOLD) {
    color =
      'bg-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  } else {
    color = 'bg-red-300 text-red-800 dark:bg-red-900 dark:text-red-200'
  }

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${color}`}
    >
      {(confidence * 100).toFixed(1)}%
    </span>
  )
}

export default ConfidenceBadge
