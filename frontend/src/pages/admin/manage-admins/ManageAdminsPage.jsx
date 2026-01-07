import React from 'react'
import { useAdminsData } from './hooks/useAdminsData'

const ManageAdminsPage = () => {
  const { data = [] } = useAdminsData()
  console.log(data)
  return <div>ManageAdmins</div>
}

export default ManageAdminsPage
