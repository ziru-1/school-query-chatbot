import React from 'react'

const ActionBadge = ({ action }) => {
  const colors = {
    create: 'bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-200',
    update: 'bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    delete: 'bg-red-300 text-red-800 dark:bg-red-900 dark:text-red-200',
  }
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${colors[action] || 'bg-gray-100 text-gray-800'}`}
    >
      {action}
    </span>
  )
}

export default ActionBadge
