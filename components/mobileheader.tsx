import React from 'react'
import MobileSidebar from './mobile-sidebar'

const Mobileheader = () => {
  return (
    <nav className='lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50'>
      <MobileSidebar />
    </nav>
  )
}

export default Mobileheader