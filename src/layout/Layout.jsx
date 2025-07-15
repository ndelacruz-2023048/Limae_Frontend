import React, { useState } from 'react'
import { Sidebar } from '../sidebar/sidebar'
import { Outlet } from 'react-router'
import { useLogout } from '../hooks/useLogout'
import { Icon } from '@iconify/react'
import { ChatModal } from '../components/Modal/ChatModal'

export const Layout = ({children}) => {
  const [isOpen, setIsOpen] = useState(false)
  

  const { logout } = useLogout()

    const handleLogoutClick  = ()=> {
        logout()
    }
  return (
    <div className='flex flex-col h-screen bg-gradient-to-r from-[#e3ebfa] via-[#e4e9f9] to-[#e1def7]'>
      <div className='h-[7%]'>
        <button className='bg-red-500 text-white p-2 rounded' onClick={handleLogoutClick}>Logout</button>
      </div>
      <div className='h-[93%] flex w-full'>
        <Sidebar />
        <div className='flex-1 flex justify-center overflow-y-auto'>
          <div className='w-[97%]'>
            <button className="
              fixed bottom-6 right-6 
              bg-transparent 
              text-white rounded-full 
              w-14 h-14 
              flex items-center justify-center 
              shadow-lg 
              z-50 
              transition-transform duration-300 ease-in-out 
              transform hover:scale-110"
              style={{ boxShadow: '5px 5px 10px #bababa, -5px -5px 10px #ffffff' }}
              onClick={() => setIsOpen(true)}
            >
              <Icon icon="fluent:chat-32-light" width="32" height="32" className='text-black' />
            </button>
            {isOpen && (
              <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            )}
            {children ? children : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  )
}
