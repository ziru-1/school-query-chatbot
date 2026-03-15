import React from 'react'
import logo from '@/assets/vivy-logo.png'

const Logo = ({ className = 'h-10 w-10 ', alt = 'Logo' }) => {
  return <img src={logo} alt={alt} className={className} />
}

export default Logo
