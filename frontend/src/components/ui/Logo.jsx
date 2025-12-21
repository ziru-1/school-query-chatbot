import React from 'react'
import logo from '@/assets/temp-logo.png'

const Logo = ({ className = 'h-10 w-10 rounded-2xl shadow', alt = 'Logo' }) => {
  return <img src={logo} alt={alt} className={className} />
}

export default Logo
